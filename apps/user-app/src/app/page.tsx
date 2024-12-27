"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Home from "../components/landing-page";

export default function Page(): JSX.Element {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Check session status, and redirect if logged in
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  // If session is still loading, you can show a loading state
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // If user is not logged in, render the Home component
  return <Home />;
}
