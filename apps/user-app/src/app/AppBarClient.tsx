"use client"
import { AppBar } from "@repo/ui/AppBar"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
export default function AppBarClient() {
    const router = useRouter();
    const session = useSession();
    return (
        <div>

            <AppBar
                onSignin={signIn}
                onSignout={async () => {
                    await signOut();
                    router.push("api/auth/signin")
                }
                }
                user={session.data?.user}
            >
            </AppBar>
        </div>
    )
}