"use client";

import React, { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2, LogIn } from 'lucide-react'
import { signIn } from 'next-auth/react'

export const LoginButton = () => {
  const [isPending, setTransition] = useTransition();
  return (
    <Button onClick={() => {
      setTransition(() => signIn());
    }}>
      {isPending ? (
        <LogIn className='mr-2 h-4 w-4' />
      ): (
        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
      )}
      Login
    </Button>
  )
}
