"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { useRouter } from "next/navigation";

export function AppbarClient() {
  const session = useSession();
  const router = useRouter();
  return (
    <div>
      <Appbar
        onSignin={async () => {
          router.push("/auth");  // ✅ Just redirect to auth page
        }}
        // onSignin={async () => {
        //   await signIn();
        //   router.push("/home");
        // }}
        onSignout={async () => {
          await signOut();
          router.push("/");
        }}
        user={session.data?.user}
      />
    </div>
  );
}