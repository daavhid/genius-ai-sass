'use client'

import { cn } from '@/lib/utils'
import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from 'lucide-react'
import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import FreeCounter from './FreeCounter'

const montserat = Montserrat({
    weight:'600',
    subsets:['latin']
})

const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      color: "text-sky-500",
    },
    {
      label: "Conversations",
      icon: MessageSquare,
      href: "/conversation",
      color: "text-violet-500",
    },
    {
      label: "Image Generation",
      icon: ImageIcon,
      href: "/image",
      color: "text-pink-700",
    },
    {
      label: "Video Generation",
      icon: VideoIcon,
      href: "/video",
      color: "text-orange-700",
    },
    {
      label: "Music Generation",
      icon: Music,
      href: "/music",
      color: "text-emerald-500",
    },
    {
      label: "Code Generation",
      icon: Code,
      href: "/code",
      color: "text-green-700",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ];

export interface apiLimitPropI {
    apiLimitCount:number
}
const Sidebar = ({apiLimitCount}:apiLimitPropI) => {
    const pathname = usePathname()
  return (
    <div className='flex flex-col justify-between space-y-4 gap-5 py-4 text-white bg-[#111827] h-full'>
        <div className=''>

            <div className='px-4'>
                <Link href={'/dashboard'} className='flex items-center gap-2'>
                    <div className='relative w-8 h-8 '>
                        <Image fill alt='logo' src={'/logo.png'}/>
                    </div>
                    <h1 className={cn('text-xl font-bold ',montserat.className)}>
                        Genius
                    </h1>
                </Link>
            </div>
            <div className='flex flex-col space-y-1 mt-6 '>
                {routes.map(route=>{
                    return (
                        <Link key={route.href}
                        href={route.href}
                        className={cn('text-sm hover:bg-white/5 font-medium transition  group flex justify-start w-full rounded-lg hover-text-white p-4',pathname===route.href && 'bg-white/10 hover:bg-white/10')}>
                            <div className='flex items-center gap-2'>
                                <route.icon className={cn('h-5 w-5 ',route.color)}/>
                                {route.label}
                            </div>
                        </Link>
                    )
                })}

            </div>
        </div>
         <FreeCounter apiLimitCount = {apiLimitCount}/>
    </div>
  )
}

export default Sidebar