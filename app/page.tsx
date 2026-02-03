"use client";

import Leaderboard from "./components/Leaderboard";
import Mecasm from "../public/mecasm.png";
import Image from "next/image";
import TascbarLogo from "../public/Light Logo.svg";

export default function Page() {
  return (
    <main className="flex flex-col justify-center items-center gap-8 pb-8">
      <div className="w-full flex justify-center bg-white py-4">
        <Image
          src={Mecasm}
          alt="mecasm logo"
          quality={100}
          priority
          className="w-48 md:w-64"
        />
      </div>
      <h1 className="text-5xl md:text-8xl font-formula-black text-center">
        POINT TABLE
      </h1>
      <Leaderboard />
      <a
        href={"https://tascbar.com"}
        className="flex justify-center items-center gap-2 font-light font-poppins underline"
      >
        <h2>Powered by</h2>
        <Image
          src={TascbarLogo}
          alt="Tascbar Logo"
          className="w-16 md:w-20"
          quality={100}
          priority
        />
      </a>
    </main>
  );
}
