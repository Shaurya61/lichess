"use client"
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import GameData from "./interface";

const Task3 = () => {
  const [userData, setUserData] = useState<GameData[]>([]);
  const searchParams = useSearchParams();
  const username = searchParams.get("username");

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
          const data = (await res.text()).match(/.+/g)?.map((text: string) =>
            JSON.parse(text)
          ) as GameData[];
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

  
  return (
    <div className='m-8'>
    <div className='bg-green-200 rounded-lg p-8 m-4'>
      <div >
        <h1 className='text-4xl font-bold text-center mb-4'>Task 3</h1>
        <h2 className='text-2xl text-center rounded-full font-bold'>Displaying User Games of {username}</h2>
      </div>
    </div>
    <div className='p-8 bg-blue-200 rounded-lg m-4'>
      {userData.map((game,index) => ( 
        <div key={index} className='p-4 bg-yellow-200 rounded-lg m-4'>
            <h1 className='text-2xl font-bold text-center'>{userData.length >0 ? (userData[index].winner ? 'Winner' : 'Loss') : ''}</h1>  
          <div className='flex justify-between'>
            <div>
              <h2 className='text-xl font-bold'>White</h2>
              <p>{game.players.white.user?.name}</p>
            </div>
            <div>
              <h2 className='text-xl font-bold'>Black</h2>
              <p>{game.players.black.user?.name}</p>
            </div>
          </div>
        </div>
      
      ))}
    </div>
    </div>
  )
}

export default Task3