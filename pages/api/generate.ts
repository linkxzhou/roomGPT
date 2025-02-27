import { Ratelimit } from "@upstash/ratelimit";
import type { NextApiRequest, NextApiResponse } from "next";
import redis from "../../utils/redis";

export type GenerateResponseData = {
  original: string | null;
  generated: string | null;
  id: string;
};

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    imageUrl: string;
    theme: string;
    room: string;
    color: string;
  };
}

// Create a new ratelimiter, that allows 3 requests per 24 hours
const ratelimit = redis
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.fixedWindow(3, "1440 m"),
      analytics: true,
    })
  : undefined;

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<GenerateResponseData | string>
) {
  // Rate Limiter Code
  if (ratelimit) {
    const identifier = "default"; // TODO: default name
    const result = await ratelimit.limit(identifier!);
    res.setHeader("X-RateLimit-Limit", result.limit);
    res.setHeader("X-RateLimit-Remaining", result.remaining);

    // Calcualte the remaining time until generations are reset
    const diff = Math.abs(
      new Date(result.reset).getTime() - new Date().getTime()
    );
    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor(diff / 1000 / 60) - hours * 60;

    if (!result.success) {
      return res
        .status(429)
        .json(
          `Your generations will renew in ${hours} hours and ${minutes} minutes. Email hassan@hey.com if you have any questions.`
        );
    }
  }

  const { imageUrl, theme, room, color } = req.body;
  let themeEn = theme.split("|")[1]
  let roomEn = room.split("|")[1]
  let colorEn = color.split("|")[1]
  console.log(`a ${colorEn} ${themeEn} ${roomEn.toLowerCase()}`);
  // POST request to Replicate to start the image restoration generation process
  let startResponse = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + process.env.REPLICATE_API_KEY,
    },
    body: JSON.stringify({
      version:
        "854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b",
      input: {
        image: imageUrl,
        prompt:
          room === "Gaming Room"
            ? "a room for gaming with gaming computers, gaming consoles, and gaming chairs"
            : `a ${colorEn} ${themeEn} style ${roomEn.toLowerCase()}`,
        a_prompt:
          "best quality, extremely detailed, photo from Pinterest, interior, cinematic photo, ultra-detailed, ultra-realistic, award-winning",
        n_prompt:
          "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
      },
    }),
  });

  let jsonStartResponse = await startResponse.json();
  console.log("polling for result... jsonStartResponse: ", jsonStartResponse);
  let endpointUrl = jsonStartResponse.urls.get;
  const originalImage = jsonStartResponse.input.image;
  const roomId = jsonStartResponse.id;

  // GET request to get the status of the image restoration process & return the result when it's ready
  let generatedImage: string | null = null;
  while (!generatedImage) {
    // Loop in 1s intervals until the alt text is ready
    let finalResponse = await fetch(endpointUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + process.env.REPLICATE_API_KEY,
      },
    });
    let jsonFinalResponse = await finalResponse.json();
    console.log("polling for result... jsonFinalResponse: ", jsonFinalResponse);
    if (jsonFinalResponse.status === "succeeded") {
      generatedImage = jsonFinalResponse.output[1] as string;
    } else if (jsonFinalResponse.status === "failed") {
      break;
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  res.status(200).json(
    generatedImage
      ? {
          original: originalImage,
          generated: generatedImage,
          id: roomId,
        }
      : "Failed to restore image"
  );
}
