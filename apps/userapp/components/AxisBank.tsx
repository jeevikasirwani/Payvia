
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import axis from "../assets/Axis_Bank_logo.svg";
import { createOnRampTransaction } from "../app/lib/actions/onramptran";

export default function AxisTransactionPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const transactionProcessed = useRef(false);

  useEffect(() => {
    const processTransaction = async () => {
      if (transactionProcessed.current) return;
      transactionProcessed.current = true;
      
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const amount = urlParams.get("amount");
        
        if (amount) {
          const numericAmount = parseFloat(amount);
          
          // Validate amount
          if (numericAmount <= 0) {
            setMessage("Transaction amount must be greater than zero.");
            setIsComplete(false);
          } else if (numericAmount > 10000) {
            setMessage("Transaction amount exceeds the limit of ₹10,000.");
            setIsComplete(false);
          } else {
            // Simulate processing delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Create and complete the transaction
            const result = await createOnRampTransaction("Axis Bank", numericAmount);
            
            if (result.token) {
              setIsComplete(true);
              setMessage(`₹${numericAmount} has been successfully added to your account.`);
              setTransactionId(`AXIS${result.token.toUpperCase()}`);
            } else {
              setIsComplete(false);
              setMessage(result.message || "Transaction failed. Please try again.");
            }
          }
        } else {
          setMessage("Invalid transaction amount.");
          setIsComplete(false);
        }
      } catch (error) {
        console.error("Transaction error:", error);
        setMessage("Transaction failed due to technical error. Please try again.");
        setIsComplete(false);
      } finally {
        setIsLoading(false);
      }
    };

    processTransaction();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-[#97144D] text-white p-4">
        <div className="container mx-auto flex justify-between items-center h-10">
          <Image src={axis} alt="Axis Bank Logo" width={120} className="pt-4" />
          <nav>
            <ul className="flex space-x-4 text-sm">
              <li>Personal</li>
              <li>Corporate</li>
              <li>NRI</li>
              <li>Priority</li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto mt-8 p-4 flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-[#97144D] mb-6 text-center">
            Transaction Processing
          </h1>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center space-y-4 py-8">
              <Loader2 className="h-16 w-16 animate-spin text-[#97144D]" />
              <p className="text-lg font-semibold text-[#97144D]">
                Processing your transaction...
              </p>
              <p className="text-sm text-gray-600">
                Please do not refresh or close this page.
              </p>
            </div>
          ) : isComplete ? (
            <div className="text-center space-y-4 py-8">
              <svg
                className="mx-auto h-16 w-16 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <h2 className="text-2xl font-bold text-green-600">
                Transaction Successful!
              </h2>
              <p className="text-lg text-gray-700">{message}</p>
              <p className="text-sm text-gray-600">
                Transaction ID: {transactionId}
              </p>
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  Your account balance has been updated. You can close this window now.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4 py-8">
              <svg
                className="mx-auto h-16 w-16 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <h2 className="text-2xl font-bold text-red-600">
                Transaction Failed
              </h2>
              <p className="text-lg text-gray-700">{message}</p>
              <div className="mt-6 p-4 bg-red-50 rounded-lg">
                <p className="text-sm text-red-800">
                  Please try again or contact customer support if the problem persists.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-[#97144D] text-white text-sm p-4 mt-8">
        <div className="container mx-auto text-center">
          © 2023 Axis Bank Ltd. All rights reserved. | Terms of Use | Privacy
          Policy
        </div>
      </footer>
    </div>
  );
}