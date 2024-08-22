"use client"

import CardButton from "@/app/components/card-button";
import { useState } from "react";

export default function Page() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);  // Ação quando o botão é clicado
    console.log(count);
  };

  return (
    <>
      <h1 className=" text-2xl text-white/80">Dashboard</h1>
      <div className="w-full h-5/6 my-5 rounded-sm">
        <div className="flex align-middle items-end">
          <div className="w-28 h-10 bg-gray-500/50 content-center text-center rounded-md">
            <h4 className="text-white/80 text-sm">/workspace</h4>
          </div>
        </div>
        <div className="grid gap-4 w-full h-full bg-gray-600/10 p-2 grid-cols-3 auto-rows-fr">
          <div className="flex size-28 justify-center items-center bg-gray-700 rounded-lg" onClick={handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-20 text-gray-800/60">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <CardButton/>
          <CardButton/>
          <CardButton/>
          <CardButton/>
          <CardButton/>
          <CardButton/>
          <CardButton/>
          <CardButton/>
          <CardButton/>
          <CardButton/>
        </div>
      </div>
    </>
  )
}   