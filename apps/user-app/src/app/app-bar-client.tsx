"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AppBar } from "@repo/ui/AppBar";

export default function AppBarClient(): JSX.Element {
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user
    ? { name: session.user.name || "Guest" } // Ensure `name` is a string
    : null;

  return (
    <div>
      <AppBar
        onEditUser={() => {
          // Handle user edit without returning a promise directly
          router.push("/profile");
        }}
        onSignIn={signIn}
        onSignOut={() => {
          // Handle sign out without returning a promise directly
          void signOut({ callbackUrl: "/auth/signin" }); // Explicitly handle the promise
        }}
        user={user}
      />
    </div>
  );
}
