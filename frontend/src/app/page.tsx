'use client'

import { SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function HomePage() {
  const { user } = useUser()

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center gap-6 p-4 font-poppins">
      <SignedIn>
        <h1 className="text-2xl font-semibold font-poppins">Welcome, {user?.firstName} {user?.lastName} 👋</h1>
        <p className="text-lg">Go to your tasks dashboard to get started.</p>
        <Link href="/dashboard">
          <Button>Go to Dashboard</Button>
        </Link>
      </SignedIn>

      <SignedOut>
        <h1 className="text-4xl font-bold">Welcome to Ai Task Manager🤖</h1>
        <p className="text-lg">Please sign in or sign up to continue.</p>
      </SignedOut>
    </main>
  )
}
