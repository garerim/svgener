"use client";

import { Loader2, LogOut } from 'lucide-react'
import React, { useTransition } from 'react'
import { signOut } from 'next-auth/react'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

export const DropdownMenuItemLogout = () => {
  const [isPending, startTransition] = useTransition()
  return (
    <DropdownMenuItem className='bg-rose-500 text-white focus:bg-rose-600 focus:text-white cursor-pointer'
    onClick={() => {
      startTransition(() => signOut())
    }}>
      {isPending ? (
        <Loader2 className='mr-2 h-5 w-5 animate-spin' />
      ) : (
        <LogOut className='mr-2 h-5 w-5' />
      )}
      Logout
    </DropdownMenuItem>
  )
}