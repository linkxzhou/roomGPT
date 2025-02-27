import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SquigglyLines from "../components/SquigglyLines";
import { useEffect, useState } from "react";
import { isWeChat, checkSumEncrypt, setLocal, getLocal, kLocalInviteCode } from "../utils/util";

const Home: NextPage = () => {
  const [linkDream, setLinkDream] = useState(false);
  const showLinkDream = (value: boolean) => setLinkDream(value);
  const [placeholder, setPlaceholder] = useState("请输入邀请码");
  const showPlaceholder = (value: string) => setPlaceholder(value);

  useEffect(() => {
    const inviteCode = getLocal(kLocalInviteCode);
    if (inviteCode) {
      showLinkDream(checkSumEncrypt(inviteCode));
      showPlaceholder(inviteCode);
    }
  }, []);

  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>造梦空间</title>
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-20 mt-20 background-gradient">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-gray-300 sm:text-7xl">
          为每个人生成梦幻房间{" "}
          <span className="relative whitespace-nowrap text-blue-600">
            <SquigglyLines />
            <span className="relative">using AI</span>
          </span>{" "}
        </h1>
        <h2 className="mx-auto mt-12 max-w-xl text-lg sm:text-gray-400  text-gray-500 leading-7">
          拍一张你房间的照片，看看不同主题下你的房间会是什么样子。100%免费 - 今天就重新设计你的房间。
        </h2>
        <div className="flex justify-between">
          <input type="text" placeholder={placeholder} className="rounded-xl text-gray-300 font-medium px-4 py-3 sm:mt-10 mt-8"
            style={{
              textAlign: 'center',
              marginRight: 10,
            }}
            onChange={(newVal) => {
              if (!isWeChat()) {
                alert("~请用微信打开当前页面~");
              } else {
                let isOk = checkSumEncrypt(newVal.target.value);
                console.log("checkSumEncrypt: ", isOk);
                showLinkDream(isOk);
                if (isOk) {
                  setLocal(kLocalInviteCode, newVal.target.value);
                }
              }
            }}
          ></input>
          {<Link
            className="bg-blue-600 rounded-xl text-white font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-blue-500 transition"
            href='/dream'
            style={{ display: linkDream ? 'block' : 'none' }}
          >
            试一试
          </Link>}
        </div>
        <div className="flex justify-between items-center w-full flex-col sm:mt-10 mt-6">
          <div className="flex flex-col space-y-10 mt-4 mb-16">
            <div className="flex sm:space-x-8 sm:flex-row flex-col">
              <div>
                <h3 className="mb-1 font-medium text-lg">原始图片</h3>
                <Image
                  alt="Original photo of a room with roomGPT.io"
                  src="/original-pic.jpg"
                  className="w-full object-cover h-96 rounded-2xl"
                  width={400}
                  height={400}
                />
              </div>
              <div className="sm:mt-0 mt-8">
                <h3 className="mb-1 font-medium text-lg">生成图片</h3>
                <Image
                  alt="Generated photo of a room with roomGPT.io"
                  width={400}
                  height={400}
                  src="/generated-pic-2.jpg"
                  className="w-full object-cover h-96 rounded-2xl sm:mt-0 mt-2"
                />
              </div>
            </div>
          </div>
        </div>
      </main >
      <Footer />
    </div >
  );
};

export default Home;
