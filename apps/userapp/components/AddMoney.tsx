
"use client";
import React from "react";
import { useState } from "react";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { Select } from "@repo/ui/select";
import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";
import { JetBrains_Mono } from "next/font/google";
import { createOnRampTransaction } from "../app/lib/actions/onramptran";

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "600"],
  subsets: ["latin"],
});

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

function AddMoney() {
  const [value, setValue] = useState(0);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={`${jetbrainsMono.className}`}>
      <Card title="Add Money">
        <div className="w-full">
          <TextInput
            label={"Amount"}
            placeholder="Amount"
            onChange={(val) => setValue(Number(val))}
          />
          <div className={`${jetbrainsMono.className} py-4 text-left`}>Bank</div>
          <Select
            onSelect={(value) => {
              setProvider(
                SUPPORTED_BANKS.find((x) => x.name === value)?.name || ""
              );
            }}
            options={SUPPORTED_BANKS.map((x) => ({
              key: x.name,
              value: x.name,
            }))}
          />

          <div className="flex justify-center pt-4">
            <Button
              onClick={async () => {
                // Prevent multiple clicks while loading
                if (isLoading) {
                  return;
                }
                
                if (value <= 0) {
                  alert("Please enter a valid amount");
                  return;
                }
                
                setIsLoading(true);
                
                try {
                  // Create the transaction
                  const result = await createOnRampTransaction(provider, value);
                  
                  console.log("Transaction result:", result); // Debug log
                  
                  // Check for success - the server action returns { success: true/false, message: string }
                  if (result && result.success === true) {
                    // Redirect to bank page
                    if (provider === "HDFC Bank") {
                      window.open(`/Bank/hdfc?amount=${value}&token=${result.token || 'default'}`, "_blank");
                    } else if (provider === "Axis Bank") {
                      window.open(`/Bank/axis?amount=${value}&token=${result.token || 'default'}`, "_blank");
                    }
                  } else {
                    // Show error message
                    alert("Failed to initiate transaction: " + (result?.message || "Unknown error"));
                  }
                } catch (error) {
                  console.error("Error:", error);
                  alert("Something went wrong during transaction");
                } finally {
                  setIsLoading(false);
                }
              }}
            >
              {isLoading ? "Processing..." : "Add Money"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default AddMoney;