"use client"

import React from 'react'
import { useCurrentUser } from '../hooks/use-current-user'
import { Loader, LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import SignOutButton from './sign-out-button'
import { useAuthActions } from '@convex-dev/auth/react'
import { useRouter } from 'next/navigation'

const UserButton = () => {
    const router = useRouter()
    const { signOut } = useAuthActions();
    const { data, isLoading } = useCurrentUser()

    if(isLoading) {
        return <Loader className="size-4 animate-spin text-muted-foreground"/>
    }

    if(!data) {
        return null
    }

    const {image, name, email} = data;

    const avatarFallback = name!.charAt(0).toUpperCase()

  return (
    <DropdownMenu modal={false}>
       <DropdownMenuTrigger className='outline-none relative'>
         <Avatar className='size-10 hover:opacity-75 transition'>
            <AvatarImage alt={name} src={image}/>
            <AvatarFallback className='bg-red-500 text-white'>
                {avatarFallback}
            </AvatarFallback>
         </Avatar>
       </DropdownMenuTrigger>
       <DropdownMenuContent className='w-60' align='center' side="right">
        <DropdownMenuItem onClick={()=> signOut().then(() => {
           router.refresh()
        }
        )}>
            <LogOut className='size-4 mr-2'/>
            Log out
            {/* <SignOutButton /> */}
        </DropdownMenuItem>
       </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton