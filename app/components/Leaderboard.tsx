"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import Aston from "../../public/aston.png";
import Ferrari from "../../public/ferrari.png";
import Mclaren from "../../public/mclaren.png";
import Redbull from "../../public/redbull.png";
import Image from "next/image";

type Team = {
  id: number;
  name: string;
  points: number;
};

export default function Leaderboard() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  // Initial fetch
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

  // Realtime subscription
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

  if (loading) return <p>Loading leaderboard…</p>;

  return (
    <ul className="max-w-7xl w-full p-4 flex flex-col gap-4 h-full">
      {teams.map((team, index) => (
        <div
          key={team.id}
          className={
            "relative w-full p-4 shadow-md rounded-xl flex justify-between items-center " +
            (team.id === 1
              ? "bg-linear-to-r from-red-700 to-red-500 border-2 border-red-500"
              : team.id === 2
                ? "bg-linear-to-r from-green-600 to-emerald-500 border-2 border-emerald-500"
                : team.id === 3
                  ? "bg-linear-to-r from-yellow-500 to-amber-400 border-2 border-amber-400"
                  : "bg-linear-to-r from-blue-700 to-blue-500 border-2 border-blue-500")
          }
        >
          <div className="flex flex-col gap-4 text-white z-5">
            <div className="font-poppins text-2xl">
              {team.name.split(" ").map((word, i) => (
                <span
                  key={i}
                  className={i === 0 ? "font-extrabold" : "font-light"}
                >
                  {word}
                </span>
              ))}
            </div>
            <div className="flex gap-8 text-2xl">
              <div className="flex items-center gap-2">
                {/* <span className="font-poppins font-bold text-sm">=</span> */}
                <span className="font-poppins font-extrabold italic">
                  {index + 1}
                </span>
              </div>
              <span className="font-poppins font-bold">
                {team.points + " Pts."}
              </span>
            </div>
          </div>

          <div className="size-28 z-5">
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
              alt="f1 car"
              className="opacity-50 -skew-x-12"
            />
          </div>

          <h2 className="absolute top-0 bottom-0 -left-20 flex items-center justify-center font-field leading-none text-[15rem] -skew-x-15 bg-linear-to-r from-transparent to-black/15 bg-clip-text text-transparent">
            {team.id === 1
              ? "FERRARI  "
              : team.id === 2
                ? "MARTIN"
                : team.id === 3
                  ? "CLAREN"
                  : "REDBULL"}
          </h2>
        </div>
      ))}
    </ul>
  );
}
