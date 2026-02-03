"use client";

import Leaderboard from "./components/Leaderboard";
import Mecasm from "../public/mecasm.png";
import Image from "next/image";
import TascbarLogo from "../public/logo.svg";

export default function Page() {
  return (
    <main className="py-12 flex flex-col justify-center items-center gap-8">
      <Image
        src={Mecasm}
        alt="mecasm logo"
        quality={100}
        priority
        className="w-48 md:w-64"
      ></Image>
      <h1 className="text-5xl md:text-8xl font-formula text-center">
        POINT TABLE
      </h1>
      <Leaderboard />
      <a
        href={"https://tascbar.com"}
        className="flex justify-center items-center gap-2 font-light font-poppins underline"
      >
        <h2 className="">Powered by</h2>
        <Image src={TascbarLogo} alt="Tascbar Logo" className="w-16" />
      </a>
    </main>
  );
}
