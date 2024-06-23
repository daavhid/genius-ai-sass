import React from 'react'
import { useUser } from '@clerk/nextjs'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const UserAvater = () => {
    const user = useUser()
  return (
    <div>
        <Avatar className='w-8 h-8'>
            <AvatarImage src={user?.user?.imageUrl}/>
            <AvatarFallback >
                {user?.user?.firstName?.charAt(0)}
                {user?.user?.lastName?.charAt(0)}

            </AvatarFallback>
        </Avatar>
        
    </div>
  )
}

export default UserAvater