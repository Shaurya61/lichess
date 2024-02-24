"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Task2 = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState("");
  const router = useRouter();
  
  const handleSearch = async () => {
    try {
      const res = await fetch(`https://lichess.org/api/user/${username}`);
      if (!res.ok) throw new Error("User not found");
      const data = await res.json();
      console.log(data);
      setUserData(data);
      // moving to task3 with username
      
    } catch (error) {
      console.error("Error searching user:", error);
    }
  };
  const renderUserInformation = () => {
    if (!userData) return null;

    // Filter out unwanted keys
    const filteredData = Object.entries(userData).filter(([key]) => {
      return key === 'count' || key === 'perfs' || key === 'id';
    });
  
    return (
      <div className="mt-8 bg-red-200 rounded-lg flex-col">
        {filteredData.map(([key, value]) => (
          <div key={key} className="p-2">
            {key === "perfs" ? renderPreferences(value) : renderKeyValue(key, value)}
          </div>
        ))}
      </div>
    );
  };

  const renderPreferences = (prefs :string) => {
    return (
      <div className="flex flex-wrap p-5 max-w-full overflow-auto">
        {Object.entries(prefs).map(([prefKey, prefValue]) => (
          <div key={prefKey} className="bg-yellow-200 m-2 rounded-lg">
            {renderKeyValue(prefKey, prefValue)}
          </div>
        ))}
      </div>
    );
  };

  const renderKeyValue = (key: string , value : string) => {
    return (
      <div key={key} className="m-2">
        {key}: {typeof value === "object" ? renderPreferences(value as any) : value}
      </div>
    );
  };

  
  return (
    <div className="w-full">
      <div className="grid justify-items-center rounded-full">
        <div className="text-center flex-col bg-violet-200 rounded-lg w-3/4 pb-8">
          <h1 className="font-bold text-4xl m-4 pt-8"> Task 2</h1>
          <h1 className="font-medium text-3xl m-4">Create a User Search Function</h1>
          <h2 className="font-medium text-xl mb-4">Search the username of Lichess player inside searchbox</h2>
          <div className="flex items-center justify-center">
            <Input
              placeholder="Enter Username Here"
              className="rounded-full w-2/4 p-8 text-xl"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div>
              <Button
                className="rounded-full m-8 p-8 text-xl"
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>
          </div>
          <Link href={{ pathname: "/task3", query: { username: username} }}>
        <div>
          <Button className="rounded-full m-8 p-8 text-xl"  onClick={()=> router.push(`/task3?username=${username}`)}>
            Move to Task 3
          </Button>
            </div>
          </Link>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-2xl m-8 p-8 bg-purple-100 items-center rounded-lg text-center ml-96 mr-96">User Information</h1>
        <div className="font-medium m-8 bg-blue-200 rounded-lg p-8">
          <div className="text-xl font-medium text-center">
            Displaying Search result          
            {renderUserInformation()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task2;
