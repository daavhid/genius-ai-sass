'use client'

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { UserButton } from '@clerk/nextjs'
import { ArrowRight, Code, ImageIcon, MessageSquare, Music, VideoIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'

const tools = [
    {
        label: 'Conversation',
        icon: MessageSquare,
        href: '/conversation',
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
    },
    {
        label: 'Music Generation',
        icon: Music,
        href: '/music',
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
    },
    {
        label: 'Image Generation',
        icon: ImageIcon,
        color: "text-pink-700",
        bgColor: "bg-pink-700/10",
        href: '/image',
    },
    {
        label: 'Video Generation',
        icon: VideoIcon,
        color: "text-orange-700",
        bgColor: "bg-orange-700/10",
        href: '/video',
    },
    {
        label: 'Code Generation',
        icon: Code,
        color: "text-green-700",
        bgColor: "bg-green-700/10",
        href: '/code',
    },
];

const DashboardPage = () => {
    const router = useRouter()
  return (
    <div className='px-4'>
        <h1 className='text-center font-bold text-2xl md:text-4xl'>Explore the power of AI</h1>
        <p className='text-muted-foreground text-sm md:text-lg font-light text-center'>chat with the smartest AI - Experience the power of AI</p>
        <div className='px-4 py-6 md:px-20 lg:px-32 space-y-4'>
            {tools.map(tool=>{
                return (
                    <Card 
                    onClick={()=>router.push(tool.href)}
                    key={tool.href}
                    className='p-4 flex justify-between items-center  hover:shadow-md transition cursor-pointer border-black/5'>
                            <div className='flex items-center gap-x-4 '>
                                <div className={`${tool.bgColor} rounded-md p-2`}>
                                    <tool.icon className={cn('h-8 w-8 ',tool.color)}/>
                                </div>
                                <h2 className='font-semibold'>
                                    {tool.label}
                                </h2>

                            </div>
                            <ArrowRight/>
                        

                    </Card>

                )
            })}

        </div>

        
    </div>

  )
}

export default DashboardPage