import { Card } from "@repo/ui/card";
import { JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "600"],
  subsets: ["latin"],
});
export const BalanceCard = ({
  amount,
  locked,
}: {
  amount: number;
  locked: number;
}) => {
  return (
    <div className={`${jetbrainsMono.className}`}>
      <Card title={"Balance"}>
        <div
          className={`${jetbrainsMono.className} flex justify-between border-b border-slate-300 pb-2 py-1`}
        >
          <div>Unlocked balance</div>
          <div>{amount / 100} INR</div>
        </div>
        <div
          className={`${jetbrainsMono.className} flex justify-between border-b border-slate-300 py-2`}
        >
          <div>Total Locked Balance</div>
          <div>{locked / 100} INR</div>
        </div>
        <div
          className={`${jetbrainsMono.className} flex justify-between border-b border-slate-300 py-2`}
        >
          <div>Total Balance</div>
          <div>{(locked + amount) / 100} INR</div>
        </div>
      </Card>
    </div>
  );
};
