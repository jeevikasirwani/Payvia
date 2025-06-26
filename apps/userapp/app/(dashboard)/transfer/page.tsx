// import prisma from "@repo/db/client";
// import { getServerSession } from "next-auth";
// import AddMoney from "../../../components/AddMoney";
// import { authOptions } from "../../lib/auth";
// import { BalanceCard } from "../../../components/BalanceCard";
// import OnRampTransaction from "../../../components/OnrampTransaction";
// import { Metadata } from "next";
// import { JetBrains_Mono } from "next/font/google";

// const jetbrainsMono = JetBrains_Mono({
//   weight: ["400", "600"],
//   subsets: ["latin"],
// });
// export const metadata: Metadata = {
//   title: "Transfer | PayVia",
//   description:
//     "Transfer funds seamlessly with Payvia digital wallet application",
// };

// async function getBalance() {
//   const session = await getServerSession(authOptions);
//   const balance = await prisma.balance.findFirst({
//     where: {
//       userId: Number(session?.user?.id),
//     },
//   });
//   return {
//     amount: balance?.amount || 0,
//     locked: balance?.locked || 0,
//   };
// }

// async function getOnRampTransactions() {
//   const session = await getServerSession(authOptions);
//   const txns = await prisma.onRampTransaction.findMany({
//     where: {
//       userId: Number(session?.user.id),
//     },
//   });
//   return txns.map((t: any) => ({
//     time: t.startTime,
//     amount: t.amount,
//     status: t.status,
//     provider: t.provider,
//   }));
// }

// export default async function () {
//   const balance = await getBalance();
//   const transactions = await getOnRampTransactions();
//   return (
//     <div className="w-full pt-10 pb-10 bg-gradient-to-tr from-indigo-200 via-blue-50 to-violet-200 ">
//       <div className="text-2xl  md:text-4xl pt-8 mb-8 font-bold text-violet-600 flex flex-col items-center">
//         <h1
//           className={`${jetbrainsMono.className} text-3xl md:text-4xl font-extrabold text-slate-800`}
//         >
//           <span className={`${jetbrainsMono.className} text-indigo-600`}>
//             PayVia{" "}
//           </span>
//           Transfer
//         </h1>
//         <p
//           className={`${jetbrainsMono.className} mt-2 text-lg md:text-xl text-slate-800 font-normal`}
//         >
//           Transfer funds seamlessly
//         </p>
//       </div>
//       <div className=" gap-4 md:grid-cols -2 pt-4  md:px-28">
//         <div>
//           <AddMoney />
//         </div>
//         <div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 px-2">
//             <BalanceCard amount={balance.amount} locked={balance.locked} />
//             <div>
//               <OnRampTransaction transactions={transactions} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AddMoney from "../../../components/AddMoney";
import { authOptions } from "../../lib/auth";
import { BalanceCard } from "../../../components/BalanceCard";
import OnRampTransaction from "../../../components/OnrampTransaction";
import { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Transfer | PayVia",
  description:
    "Transfer funds seamlessly with Payvia digital wallet application",
};

async function getBalance() {
  const session = await getServerSession(authOptions);
  
  // Handle missing session
  if (!session?.user?.id) {
    return {
      amount: 0,
      locked: 0,
    };
  }

  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session.user.id),
    },
  });
  
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  
  // Handle missing session
  if (!session?.user?.id) {
    return [];
  }

  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session.user.id),
    },
  });
  
  return txns.map((t: any) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

export default async function TransferPage() {
  const session = await getServerSession(authOptions);
  
  // Redirect to home if not authenticated
  if (!session?.user?.id) {
    redirect('/home');
  }

  const balance = await getBalance();
  const transactions = await getOnRampTransactions();
  
  return (
    <div className="w-full pt-10 pb-10 bg-gradient-to-tr from-indigo-200 via-blue-50 to-violet-200 ">
      <div className="text-2xl  md:text-4xl pt-8 mb-8 font-bold text-violet-600 flex flex-col items-center">
        <h1
          className={`${jetbrainsMono.className} text-3xl md:text-4xl font-extrabold text-slate-800`}
        >
          <span className={`${jetbrainsMono.className} text-indigo-600`}>
            PayVia{" "}
          </span>
          Transfer
        </h1>
        <p
          className={`${jetbrainsMono.className} mt-2 text-lg md:text-xl text-slate-800 font-normal`}
        >
          Transfer funds seamlessly
        </p>
      </div>
      <div className=" gap-4 md:grid-cols -2 pt-4  md:px-28">
        <div>
          <AddMoney />
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 px-2">
            <BalanceCard amount={balance.amount} locked={balance.locked} />
            <div>
              <OnRampTransaction transactions={transactions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}