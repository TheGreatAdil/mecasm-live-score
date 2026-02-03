"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import Aston from "../../public/aston.png";
import Ferrari from "../../public/ferrari.png";
import Mclaren from "../../public/mclaren.png";
import Redbull from "../../public/redbull.png";
import AstonCar from "../../public/cars/aston.png";
import FerrariCar from "../../public/cars/ferrari.png";
import MclarenCar from "../../public/cars/mclaren.png";
import RedbullCar from "../../public/cars/redbull.png";
import Image from "next/image";

type Team = {
  id: number;
  name: string;
  points: number;
};

const dummydata = [
  {
    id: 1,
    name: "SCUDERIA FERRARI",
    points: 0,
  },
  {
    id: 2,
    name: "ASTON MARTING",
    points: 0,
  },
  {
    id: 3,
    name: "MCLAREN",
    points: 0,
  },
  {
    id: 4,
    name: "REDBULL RACING",
    points: 0,
  },
];

export default function Leaderboard() {
  const [teams, setTeams] = useState<Team[]>(dummydata);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeams() {
      const { data, error } = await supabase
        .from("teams")
        .select("id, name, points")
        .order("points", { ascending: false });

      if (!error && data) {
        setTeams(data);
      }

      setLoading(false);
    }

    fetchTeams();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("teams-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "teams",
        },
        (payload) => {
          setTeams((prev) => {
            let updated = [...prev];

            if (payload.eventType === "INSERT") {
              updated.push(payload.new as Team);
            }

            if (payload.eventType === "UPDATE") {
              updated = updated.map((team) =>
                team.id === payload.new.id ? (payload.new as Team) : team,
              );
            }

            if (payload.eventType === "DELETE") {
              updated = updated.filter((team) => team.id !== payload.old.id);
            }

            return updated.sort((a, b) => b.points - a.points);
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <ul className="md:max-w-4xl w-full p-4 flex flex-col gap-4 h-full">
      {teams.map((team, index) => (
        <div
          key={team.id}
          className={
            "relative w-full p-4 shadow-md rounded-4xl flex justify-between items-center border border-white bg-linear-110 from-black overflow-hidden " +
            (team.id === 1
              ? "to-[#e62424] "
              : team.id === 2
                ? "to-[#32d026]"
                : team.id === 3
                  ? "to-[#e6df1a]"
                  : "to-[#1f68e0]")
          }
        >
          <div className="flex flex-col gap-4 text-white z-5 font-formula-bold text-xl">
            <div>{team.name}</div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <span>=</span>
                <span className="text-[15px] text-neutral-200">
                  {index + 1}
                </span>
              </div>
              <span className="font-bold text-2xl">{team.points + " pts"}</span>
            </div>
          </div>

          <div className="absolute right-5 size-24 md:size-28">
            <Image
              src={
                team.id === 1
                  ? Ferrari
                  : team.id === 2
                    ? Aston
                    : team.id === 3
                      ? Mclaren
                      : Redbull
              }
              alt="logos"
            />
          </div>

          <div className="absolute right-5 bottom-[15%] w-36 md:w-64">
            <Image
              src={
                team.id === 1
                  ? FerrariCar
                  : team.id === 2
                    ? AstonCar
                    : team.id === 3
                      ? MclarenCar
                      : RedbullCar
              }
              alt="logos"
              className="drop-shadow-xl drop-shadow-black/75"
            />
          </div>
        </div>
      ))}
    </ul>
  );
}
