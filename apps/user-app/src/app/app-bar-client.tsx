"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AppBar } from "@repo/ui/AppBar";
import { useEffect, useState } from "react";

export default function AppBarClient(): JSX.Element {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status !== "loading") {
      setIsLoading(false); // Stop loader when session is loaded
    }
  }, [status]);

  if (isLoading) {
    // Display loader while session is being fetched
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm z-50">
      <div className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
    
    );
  }

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
