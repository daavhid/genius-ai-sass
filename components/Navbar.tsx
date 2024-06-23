import { Menu } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { UserButton } from '@clerk/nextjs'


import Mobile from './Mobile'
import { apiLimitPropI } from './Sidebar'
  

const Navbar = ({apiLimitCount}:apiLimitPropI) => {
  return (
    <div className='flex items-center justify-between  p-4'>
        <Mobile apiLimitCount={apiLimitCount}/>
        <div className=' ml-auto'>
            

            <UserButton afterSignOutUrl='/'/>
        </div>
    </div>
  )
}

export default Navbar