import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import {  checkApiLimit, getApiLimitCount } from '@/lib/userApiLimit'
import React, { ReactNode } from 'react'

const layout = async({children}:{children:React.ReactNode}) => {
    const apiLimitCount = await getApiLimitCount()
  return (
    <div className='flex h-full'>
        <div className='bg-gray-900 sm:w-72 h-full sm:fixed  hidden sm:flex sm:flex-col inset-y-0   '>
            <Sidebar apiLimitCount={apiLimitCount}/>
        </div>
        <div className='sm:pl-72 w-full'>
            <Navbar apiLimitCount={apiLimitCount}/>
            {children}
        </div>
    </div>
  )
}

export default layout