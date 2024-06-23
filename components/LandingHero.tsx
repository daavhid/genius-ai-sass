'use client'

import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import TypewriterComponent from 'typewriter-effect'
import { Button } from './ui/button'

const LandingHero = () => {
    const {isSignedIn} = useAuth()
  return (
    <div className='py-24 md:py-32 text-white text-center font-bold '>
        <div className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold space-y-2'>

            <h1 className=' '>The Best AI Tool for</h1>
            <div className='bg-clip-text bg-gradient-to-r from-purple-400  to-pink-700 text-transparent p-1'>
                <TypewriterComponent options={{
                    strings:[
                        'Chatbot.',
                        'Photo Generation.',
                        'Music Generation.',
                        'Image Generation.',
                        'Video Generation.'
                    ],
                    autoStart:true,
                    loop:true,
                   
                    

                }}/>
            </div>
            <div className='text-sm  font-light text-zinc-400'>
                create content using AI 10x faster.
            </div>
            <Link href={isSignedIn?'/dashboard':'/sign-up'}>
                <Button variant={'premium'} className='md:text-lg p-4 md:p-6 rounded-full font-semibold'>
                    Get started for Free
                </Button>
            </Link>
            <div className='text-sm md:text-xl font-light text-zinc-400'>
                No credit card required.
            </div>
        </div>
        
    </div>
  )
}

export default LandingHero