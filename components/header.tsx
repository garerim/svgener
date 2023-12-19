import React from 'react'
import { ThemeToggle } from './theme-toggle'
import { getAuthSession } from '@/lib/auth'

import { LoginButton } from './auth/login-button'
import { MenuButton } from './auth/menu-button'
import Link from 'next/link'

export const Header = async () => {
  const session = await getAuthSession()

  return (
    <header className='flex items-center w-full p-2'>
        <Link href='/'>
          <h2 className='text-3xl font-bold'>SVGener</h2>
        </Link>
        <div className='ml-auto flex items-center gap-x-2'>
            {session?.user ? (
              <MenuButton />
            ):(
              <LoginButton />
            )}
            <ThemeToggle />
        </div>
    </header>
  )
}
