"use client";
import { JetBrains_Mono } from "next/font/google";


const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "600"],
  subsets: ["latin"],
});
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`${jetbrainsMono.className} text-white  bg-gradient-to-r from-indigo-600 to-indigo-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`}
    >
      {children}
    </button>
  );
};