"use client";

import { useState, useRef } from "react";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { p2pTransfer } from "../app/lib/actions/P2Ptransfer";

import { JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "600"],
  subsets: ["latin"],
});

export default function SendCard() {
  const [number, setNumber] = useState<string>("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleNumberInput = (selectedNumber: string) => {
    setNumber(selectedNumber);
    inputRef.current?.blur;
  };

  const handleSendMoney = async () => {
    try {
      if (Number(amount) <= 0) {
        setMessage("Amount should be greater than 0");
        return;
      }
      await p2pTransfer(number, Number(amount) * 100);
      setMessage("Money sent successfully!");
    } catch (error) {
      setMessage("Failed to send money. Please try again.");
    }
  };

  return (
    <div
      className={`${jetbrainsMono.className} pt-10`}
    >
      <Center>
        <Card title="Send Money">
          <div className="min-w-80 pt-2">
            <div className="pt-2">
              <label className="block mb-2 text-sm font-medium text-indigo-800">
                Number
              </label>
              <input
                ref={inputRef}
                type="text"
                placeholder="Number"
                value={number}
                onChange={(e) => {
                  setNumber(e.target.value);
                }}
                className="bg-indigo-100 border border-indigo-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <TextInput
              placeholder={"Amount"}
              label="Amount"
              onChange={(value) => setAmount(value)}
            />
            <div className="pt-4 flex justify-center">
              <button
                onClick={async () => {
                  setLoading(true);
                  await handleSendMoney();
                  setLoading(false);
                }}
                type="button"
                className=" bg-gradient-to-r from-indigo-400 to-indigo-600  font-medium text-white hover:from-indigo-500 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-gray-300  rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </div>

            {message && (
              <p
                className={`mt-4 text-center text-sm ${message === "Money sent successfully!" ? "text-green-600" : "text-red-600"}`}
              >
                {message}
              </p>
            )}
          </div>
        </Card>
      </Center>
    </div>
  );
}
