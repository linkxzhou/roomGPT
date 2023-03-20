import Link from "next/link";
import { getLocal, kLocalInviteCode } from "../utils/util";
import { useEffect, useState } from "react";

export default function Header({ photo }: { photo?: string }) {
  const [userName, setUserName] = useState("邀请码<空>");
  const currentUserName = (value: string) => setUserName(value);
  useEffect(() => {
    const inviteCode = getLocal(kLocalInviteCode);
    if (inviteCode) {
      currentUserName(inviteCode);
    }
  });

  return (
    <header className="flex flex-col xs:flex-row justify-between items-center w-full mt-3 border-b pb-7 sm:px-4 px-2 border-gray-500 gap-2">
      <Link href="/" className="flex space-x-2">
        <h1 className="sm:text-3xl text-xl font-bold ml-2 tracking-tight">
          造梦空间
        </h1>
      </Link>
      <span
        className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-blue-600 text-white px-5 py-2 text-sm shadow-md hover:bg-blue-500 bg-blue-600 font-medium transition"
      >
        <p>{userName}</p>
      </span>
    </header>
  );
}
