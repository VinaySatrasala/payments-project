"use client";
import { Card } from "@repo/ui/card";
import { Input } from "@repo/ui/Input";
import { Label } from "@repo/ui/Label";
import { Button } from "@repo/ui/Button";
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";

export default function SignIn(): JSX.Element {
  const [number, setNumber] = useState<number>(0);
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Check for error in URL (query string)
  useEffect((): void => {
    const urlParams = new URLSearchParams(window.location.search);
    const errorMessage = urlParams.get("error");
    if (errorMessage) {
      setError("Invalid credentials. Please try again.");
    }
  }, []);

  const handleSignIn = async (): Promise<void> => {
    if (!number || !password) {
      return;
    }

    setLoading(true); // Start loading
    setError(null); // Clear previous errors

    const result = await signIn("credentials", {
      phone: number,
      password,
      redirect: true,
      callbackUrl: "/dashboard",
    });
    if (result?.error) {
      setError("Invalid credentials. Please try again."); // Set error if login fails
    }

    setLoading(false); // Stop loading
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md space-y-8 shadow-lg text-black">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-white">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <Label>Phone number</Label>
              <Input
                id="phone-number"
                name="phone number"
                required
                className="mt-1"
                placeholder="Phone number"
                onchange={(e) => {
                  setNumber(Number(e.target.value));
                }}
              />
            </div>
            <div>
              <Label>Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1"
                placeholder="Password"
                onchange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

          <div className="text-right">
            <div className="text-sm">
              <button
                className="font-medium text-neutral-400 hover:text-white"
                onClick={() => {
                  // Handle forgot password
                }}
              >
                Forgot your password?
              </button>
            </div>
          </div>

          <div className="text-center">
            <Button
              className="w-1/2 py-2 px-4"
              onClick={async () => {
                setLoading(true);
                await handleSignIn();
                setLoading(false);
              }}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm text-white" />
              ) : (
                "Sign in"
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
