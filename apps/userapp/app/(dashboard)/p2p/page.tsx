import React from 'react'
import SendCard from '../../../components/SendMoney'
import { JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "600"],
  subsets: ["latin"],
});

export default function Page() {
  return (
    <div className={`${jetbrainsMono.className}  bg-gradient-to-tr from-indigo-200 via-blue-50 to-violet-200 min-h-screen w-full px-4 sm:px-6 lg:px-8 `}>
      <div className="flex justify-center text-4xl pt-20 font-extrabold">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800">
          <span className="text-indigo-600">PayVia </span>P2P Transfer
        </h1>
      </div>
      <div className="text-center pb-8 sm:pb-12">
        <p className="pt-2 text-lg sm:text-xl text-slate-800">
          Fast and safe P2P transfers
        </p>
      </div>
      <div className="flex justify-center">
        <SendCard />
      </div>
    </div>
  )
}