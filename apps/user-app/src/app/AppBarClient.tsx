"use client";

import { AppBar } from "@repo/ui/AppBar";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AppBarClient() {
  const { data: session } = useSession();

  const user = session?.user
    ? { name: session.user.name || "Guest" } // Ensure `name` is a string
    : null;

  return (
    <div>
      <AppBar
        onSignIn={signIn}
        onSignOut={async () => {
          await signOut({ callbackUrl: "/auth/signin" });
        }}
        user={user}
      />
    </div>
  );
}
