"use client"

import { Button } from '@/components/ui/button'
import { useAuthActions } from '@convex-dev/auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'

const SignOutButton = () => {
    const router = useRouter()
    const { signOut } = useAuthActions();

    const handleSignOut = () => {
        signOut().then(() => {
            router.refresh()
        })
    }
  return (
    <Button onClick={handleSignOut}>
        Sign out
      </Button>
  )
}

export default SignOutButton