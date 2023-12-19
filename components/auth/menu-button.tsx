import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { DropdownMenuItemLogout } from './logout-button'

import { getAuthSession } from '@/lib/auth'

import { BookmarkCheck, Gem, Menu, MessageCircleMore } from 'lucide-react'
import Link from 'next/link'

export const MenuButton = async () => {
    const session = await getAuthSession()

    if (!session?.user) {
        return null
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size='sm' variant='outline'>
                    <Menu className='h-5 w-5' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='flex flex-col gap-y-1'>
                <DropdownMenuItem className='cursor-pointer' asChild>
                    <Link href='/favorites'>
                        <BookmarkCheck className='mr-2 h-5 w-5' />
                        My favorites
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer' asChild>
                    <Link href='/subscription'>
                        <Gem className='mr-2 h-5 w-5' />
                        Get Pro
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer' asChild>
                    <Link href='/'>
                        <MessageCircleMore className='mr-2 h-5 w-5' />
                        Feedback
                    </Link>
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItemLogout />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
