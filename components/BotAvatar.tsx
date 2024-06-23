import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from '@/lib/utils'


const BotAvatar = ({classname}:{classname?:string}) => {
  return (
    <div>
        <Avatar className='w-10 h-10'>
            <AvatarImage src="/logo.png" className={cn('p-1 object-scale-down center',classname)} />
            <AvatarFallback>BO</AvatarFallback>
        </Avatar>

        
    </div>
  )
}

export default BotAvatar