import Image from 'next/image'
import React from 'react'

const Empty = ({label}:{label:string})=>{
    return(
        <div className='flex p-20 h-full  flex-col items-center justify-center'>
            <div className='  flex justify-center'>

                <Image height={240} width={240} src={'/empty.png'} alt='empty.png' className='object-contain'/>
            </div>
            <p className='text-sm text-muted-foreground'>{label}</p>
        </div>
    )
}

export default Empty