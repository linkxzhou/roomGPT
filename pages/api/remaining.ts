import type { NextApiRequest, NextApiResponse } from "next";
import redis from "../../utils/redis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Query the redis database by email to get the number of generations left
  const identifier = "default"; // TODO: default name
  const windowDuration = 24 * 60 * 60 * 1000;
  const bucket = Math.floor(Date.now() / windowDuration);

  const usedGenerations =
    (await redis?.get(`@upstash/ratelimit:${identifier!}:${bucket}`)) || 0;

  const remainingGenerations =
    Number(usedGenerations) > 3 ? 0 : 3 - Number(usedGenerations);

  return res.status(200).json({ remainingGenerations });
}
