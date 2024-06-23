import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='h-full bg-[#111827] overflow-auto'>
        <div className='max-w-screen-xl w-full mx-auto'>

            {children}
        </div>
    </div>
  )
}

export default layout