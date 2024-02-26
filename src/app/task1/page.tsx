"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";

const Task1 = () => {
  /* Creating a HandleSubmit which Fetches api  and returns response*/
  const handleSubmit = async () => {
    const res = await fetch(`https://lichess.org/api/status`);
    if (res.ok) {
      alert("API is Working");
      console.log(res.status);
    } else {
      alert("API is not Working");
      console.log(res.status);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen rounded-full">
      <div className="text-center flex-col bg-blue-200 rounded-lg w-3/4 pb-8">
        <h1 className="font-bold text-4xl m-4 pt-8"> Task 1</h1>
        <h1 className="font-medium text-3xl m-4">Connecting to API</h1>
        <h2 className="font-medium text-xl mb-4">
          Click the button Below to check the status of API
        </h2>
        <div>
          <Button
            className="rounded-full m-8 p-8 text-xl"
            onClick={handleSubmit}
          >
            Check Status
          </Button>
        </div>
        <Link href="/task2">
          <div>
            <Button className="rounded-full m-8 p-8 text-xl">
              Move to Task 2
            </Button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Task1;
