"use client"
import { Card } from "@repo/ui/card"
import { Input } from "@repo/ui/Input"
import { Label } from "@repo/ui/Label"
import { Button } from '@repo/ui/Button'
import {signIn} from "next-auth/react" 
import { useState } from "react"
export default function SignIn() {
  const [number,setNumber] = useState(0);
  const [password,setPassword] = useState("");
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md space-y-8 shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-white">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <Label>
                Phone number
              </Label>
              <Input
                id="phone-number"
                name="phone number"
                required
                className="mt-1"
                placeholder="Phone number"
                onchange={(e)=>{
                  setNumber(Number(e.target.value))
                }}
              />
            </div>
            <div>
              <Label>
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1"
                placeholder="Password"
                onchange={(e)=>{
                  setPassword(e.target.value)
                }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-neutral-800 bg-neutral-900 text-white focus:ring-neutral-700"
              />
              <Label>
                Remember me
              </Label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-neutral-400 hover:text-white">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <Button
              className="w-full py-2 px-4"
              onClick={()=>{
                signIn("credentials",{"phone":number,"password" : password})
              }}
            >
              Sign in
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

