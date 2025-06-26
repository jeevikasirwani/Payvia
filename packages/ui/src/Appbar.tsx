import { Button } from "./button";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  onSignin: () => void;
  onSignout: () => void;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  const router = useRouter();
  function handleRedirect() {
    if (user) router.push("/dashboard");
    else router.push("/home");
    console.log("redirecting to home page");
  }

  return (
    <div className="px-10 flex justify-between border py-0.5 md:px-4 fixed top-2 left-0 right-0 z-50 md:max-w-7xl mx-auto rounded-lg w-full backdrop-blur-md bg-blue-200 bg-opacity-5 border-gray-100 mb-6">
      <div className="text-[20px] flex flex-col justify-center">
        <div
          className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer"
          onClick={handleRedirect}
        >
          Payvia
        </div>
      </div>
      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        <Link
          href="/dashboard"
          className="text-slate-700 font-medium hover:text-indigo-600 transition"
        >
          Home
        </Link>
        <Link
          href="/transfer"
          className="text-slate-700 font-medium hover:text-indigo-600 transition"
        >
          Transfer
        </Link>
        <Link
          href="/transactions"
          className="text-slate-700 font-medium hover:text-indigo-600 transition"
        >
          Transactions
        </Link>
        <Link
          href="/p2p"
          className="text-slate-700 font-medium hover:text-indigo-600 transition"
        >
          P2P Transfer
        </Link>
        <Button onClick={user ? onSignout : onSignin}>
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
};