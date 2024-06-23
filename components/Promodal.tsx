import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { usePromodal } from '@/hooks/useProModal'
import { Check, Code, ImageIcon, MessageSquare, Music, VideoIcon, Zap } from 'lucide-react';

import { Badge } from './ui/badge'
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

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



const Promodal = () => {
    const promodal = usePromodal()
  return (
        <Dialog open={promodal.isOpen} onOpenChange={promodal.onClose}>
            <DialogContent className='rounded-lg'>
                <DialogHeader className='rounded-lg'>
                    <DialogTitle className='flex  items-center justify-center rounded-lg'>
                        <div className='flex items-center gap-x-2 font-bold'>

                            Upgrade to Genius
                            <Badge variant={'premium'} className='uppercase text-sm p-1'>
                                pro
                            </Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription>
                    {tools.map(tool=>{
                return (
                    <Card 
                    
                    key={tool.label}
                    className='p-2 flex justify-between items-center  border-black/5'>
                            <div className='flex items-center gap-x-4 '>
                                <div className={`${tool.bgColor} rounded-md p-2`}>
                                    <tool.icon className={cn('h-6 w-6 ',tool.color)}/>
                                </div>
                                <h2 className='font-semibold'>
                                    {tool.label}
                                </h2>

                            </div>
                            <Check className='text-primary w-5 h-5'/>
                        
                        

                    </Card>

                )
            })}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant={'premium'} size={'lg'} className='w-full' >
                        Upgrade 
                        <Zap className=' fill-white ml-2 w-4 h-4'/>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
  )
}

export default Promodal