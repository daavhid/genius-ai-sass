'use client'
import { cn } from '@/lib/utils'
import { useAuth } from '@clerk/nextjs'
import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const montserat = Montserrat({
    weight:'600',
    subsets:['latin']
})

const LandingNavbar = () => {
    const {isSignedIn} = useAuth()
  return (
    <div className='p-4 flex justify-between items-center'>
        <div >
            <Link href={'/'} className='flex gap-x-2 items-center '>
                <div className='relative h-8 w-8'>
                    <Image
                    src={'/logo.png'}
                    alt='logo'
                    fill/>
                </div>
                <h1 className={cn('text-2xl font-bold text-white',montserat.className)}>Genius</h1>
            </Link>
        </div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
            <Button variant={'outline'} className='rounded-full '>
                Get Started
            </Button>
        </Link>
    </div>
  )
}

export default LandingNavbar