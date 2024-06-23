'use client'
import React, { useEffect, useState } from 'react'
import Promodal from './Promodal'

const ModalProvider = () => {
    const [mounted,setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    })
    if(!mounted){
        return null
    }
  return (
    <div>
        <Promodal/>
    </div>
  )
}

export default ModalProvider