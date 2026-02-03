"use client";

import Leaderboard from "./components/Leaderboard";
import Mecasm from "../public/mecasm.png";
import Image from "next/image";

export default function Page() {
  return (
    <main className="py-12 flex flex-col justify-center items-center gap-8">
      <Image src={Mecasm} alt="mecasm logo" quality={100} priority></Image>
      <h1 className="text-6xl md:text-8xl font-formula text-center">
        POINT TABLE
      </h1>
      <Leaderboard />
    </main>
  );
}
