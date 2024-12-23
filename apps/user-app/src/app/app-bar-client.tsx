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
          router.push("/profile");
        }}
        onSignIn={() => {
          void signIn(); // Explicitly mark the promise as intentionally unhandled
        }}
        onSignOut={() => {
          void signOut({ callbackUrl: "/auth/signin" }); // Explicitly handle the promise
        }}
        user={user}
      />
    </div>
  );
}
