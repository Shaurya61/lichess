"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import GameData from "../task3/interface";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Task4 = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<GameData[]>([]);
  const useSafeSearchParams = () => {
    try {
      return useSearchParams();
    } catch (error) {
      console.error("Error using search params:", error);
      return new URLSearchParams(); // return an empty URLSearchParams instance
    }
  };
  const searchParams = useSafeSearchParams();
  const username = searchParams.get("username");

  useEffect(() => {
    if (username) {
      fetchGameData(username);
    }
  }, [username]);

  const fetchGameData = async (username: string) => {
    try {
      const res = await fetch(
        `https://lichess.org/api/games/user/${username}?max=10`,
        {
          headers: {
            Accept: "application/x-ndjson",
          },
        }
      );
      if (res.ok) {
        const data = (await res.text())
          .match(/.+/g)
          ?.map((text: string) => JSON.parse(text)) as GameData[];
        setUserData(data);
      } else {
        console.error("Error fetching user games:", res);
      }
    } catch (error) {
      console.error("Error fetching user games:", error);
    }
  };

  return (
    <div className="m-4">
      <div className="bg-green-200 rounded-lg p-8 m-4">
        <h1 className="text-4xl font-bold text-center mb-4">Task 4</h1>
        <h2 className="text-2xl text-center rounded-full font-bold">
          Displaying Game Moves of {username}
        </h2>
      </div>
      <div>
        {userData && userData.length >0 ? ( 
        <div className="p-8 bg-blue-200 rounded-lg m-4 flex flex-wrap justify-between">
        {userData.map((game, index) => (
          <GameCard key={index} game={game} username={username as string} />
        ))}
      </div>
        ) : (<div className="w-full flex items-center justify-center text-2xl font-semibold">No Data Available</div>)}
      </div>
      <Link href={`/task3`} prefetch={false}>
        <div className="ml-4 mt-2 text-center">
        <Button className="rounded-full p-7 text-xl" onClick={() => router.back()}>Back to Task 3</Button>
        </div>
      </Link>
    </div>
  );
};

const GameCard = ({ game, username }: { game: GameData; username: string }) => (
  <div className="p-4 bg-yellow-200 rounded-lg m-4 w-4/12">
    {game.players.white.user &&
    game.players.black.user &&
    game.players.white.user.name &&
    game.players.black.user.name ? (
      <div>
        <h1 className="text-2xl font-bold text-center">
          {game.players.white.user.name === username &&
          game.winner === "black" ? (
            <p className="text-red-500">Loss</p>
          ) : (
            <p className="text-green-500">Winner</p>
          )}
        </h1>
        <div className="flex justify-between">
          <PlayerInfo title="White" name={game.players.white.user.name} />
          <PlayerInfo title="Black" name={game.players.black.user.name} />
        </div>
        <div className="mt-4 font-medium text-base">{game.moves}</div>
      </div>
    ) : (
      <h1 className="text-2xl font-bold text-center">No Data</h1>
    )}
  </div>
);

const PlayerInfo = ({ title, name }: { title: string; name: string }) => (
  <div>
    <h2 className="text-xl font-bold">{title}</h2>
    <p>{name}</p>
  </div>
);

export default Task4;