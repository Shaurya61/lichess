import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-300 rounded-lg m-8 text-center">
      <h1 className="text-4xl text-center font-bold font-weight-200 pt-8 pb-8">Welcome to Viralize Assignment Submission</h1>
      <h3 className="text-xl font-medium mb-8">Below are Provided Submission Task:</h3>
      <div className="flex flex-col items-start items-center gap-4 pb-8">
       <Link href='/task1'><Button className="rounded-full">Task1</Button></Link>
       <Link href='/task2'><Button className="rounded-full">Task2</Button></Link>
       <Link href='/task3'><Button className="rounded-full">Task3</Button></Link>
       <Link href='/task4'><Button className="rounded-full">Task4</Button></Link>
      </div>
    </div>
  );
}
