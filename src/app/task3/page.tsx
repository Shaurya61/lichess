"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import GameData from "./interface";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Task3 = () => {
  const [userData, setUserData] = useState<GameData[]>([]);
  const [mounted,setMounted] = useState(false);
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

  const router = useRouter();
  const getDate = (timestamp: number) => {
    const DateObj = new Date(timestamp);
    const month = DateObj.getMonth() + 1;
    const day = DateObj.getDate();
    const year = DateObj.getFullYear();
    const hours = DateObj.getHours();
    const minutes = DateObj.getMinutes();
    const seconds = DateObj.getSeconds();
    const formattedMonth = month < 10 ? "0" + month : month;
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedHours = hours < 10 ? "0" + hours : hours;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    return `${formattedMonth}/${formattedDay}/${year} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };
  // Fetch user data by the given username
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    const fetchGameData = async () => {
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
          console.log(data);
        } else {
          console.error("Error fetching user games:", res);
        }
      } catch (error) {
        console.error("Error fetching user games:", error);
      }
    };
    if (username) {
      fetchGameData();
    }
  }, [username]);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null; // return this null to avoid hydration errors
  }
  return (
    <div className="m-8">
      <div className="bg-green-200 rounded-lg p-8 m-4">
        <div>
          <h1 className="text-4xl font-bold text-center mb-4">Task 3</h1>
          <h2 className="text-2xl text-center rounded-full font-bold">
            Displaying User Games of {username}
          </h2>
        </div>
      </div>
      <div className="p-8 bg-blue-200 rounded-lg m-4 flex flex-wrap justify-between">
        { userData && userData.length === 0 ? (
        <div>
        {userData.map((game, index) => (
          <div key={index} className="p-4 bg-yellow-200 rounded-lg m-4 w-4/12">
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
                  <div>
                    <h2 className="text-xl font-bold">White</h2>
                    <p>{game.players.white.user.name}</p>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Black</h2>
                    <p>{game.players.black.user.name}</p>
                  </div>
                </div>
                <h1 className="text-xl font-bold mt-2">
                  Time Stamp of Last Move :
                  <span className="text-base ml-2 font-normal ">
                    {getDate(game.lastMoveAt)}
                  </span>
                </h1>
              </div>
            ) : (
              <h1 className="text-2xl font-bold text-center">No Data</h1>
            )}
          </div>
        ))}
        </div>
        ) : (<div className="w-full flex items-center justify-center text-2xl font-semibold">No Data Available</div>)}
      </div>
      <Link href={{ pathname: "/task4", query: { username: username } }} prefetch={false}>
        <div className="ml-4 mt-2 text-center">
          <Button
            className="rounded-full p-8 text-xl"
            onClick={() => router.push(`/task4?username=${username}`)}
          >
            Move to Task 4
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default Task3;
