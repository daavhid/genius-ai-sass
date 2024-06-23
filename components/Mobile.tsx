'use client'

import { Menu } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Sidebar, { apiLimitPropI } from './Sidebar'

const Mobile = ({apiLimitCount}:apiLimitPropI) => {
    const [isMounted,setIsMounted] = useState(false)
    useEffect(()=>{
        setIsMounted(true)

    },[])

    if(!isMounted){
        return null
    }
  return (
    <Sheet>
        <SheetTrigger>

            <Button variant={'ghost'} size={'icon'} 
            className='sm:hidden flex items-center'>

                <Menu/>
            </Button>
        </SheetTrigger>
        <SheetContent side={'left'} className='p-0 w-72' >
            <Sidebar apiLimitCount={apiLimitCount}/>
        </SheetContent>
    </Sheet>
  )
}

export default Mobile