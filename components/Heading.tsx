import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import React from 'react'

interface headingProps {
    title : string,
    description : string,
    icon:LucideIcon,
    bgColor?:string,
    iconColor?:string
}

const Heading = ({
    title,
    description,
    icon:Icon,
    bgColor,
    iconColor,
}: headingProps) => {
  return (
    <div className='gap-x-3 flex items-center px-4 lg:px-8'>
        <div className={`${bgColor} p-2 w-fit rounded-md`}>
            <Icon className={cn('h-10 w-10 ',iconColor)}/>
        </div>
        <div>
            <h2 className='font-bold text-3xl'>
                {title}
            </h2>
            <p className='text-muted-foreground text-sm'>{description}</p>
        </div>
    </div>
  )
}

export default Heading