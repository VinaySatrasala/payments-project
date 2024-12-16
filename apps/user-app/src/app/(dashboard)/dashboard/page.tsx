"use client"
import { useSession } from "next-auth/react"
export default function Page() : JSX.Element{
    const session = useSession();
    return <div>
        {JSON.stringify(session)}
        Dashboard Page (or transfer/txn page)
    </div>
}