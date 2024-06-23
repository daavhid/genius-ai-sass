import React, { useEffect, useState } from 'react'
import { apiLimitPropI } from './Sidebar'
import { Card, CardContent } from './ui/card'
import { MAX_API_LIMIT } from '@/constant'
import { Progress } from './ui/progress'
import { Button } from './ui/button'
import { Zap } from 'lucide-react'
import { usePromodal } from '@/hooks/useProModal'

const FreeCounter = ({apiLimitCount=0}:apiLimitPropI) => {
    const promodal = usePromodal()
    const [isMounted,setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    },[])
    if(!isMounted){
        return null
    }
  return (
    <div className='px-3  '>
        <Card className='bg-gray-100/10 border-0'>
            <CardContent className='py-6'>
                <div className='text-white text-center space-y-2'>
                    <p>{apiLimitCount}/{MAX_API_LIMIT} Free Generations</p>
                    <Progress value={(apiLimitCount/MAX_API_LIMIT)*100} className='h-4'/>
                    <Button variant={'premium'} 
                    onClick={promodal.onOpen} className='w-full'>
                        Upgrade 
                        <Zap className=' fill-white ml-2 w-4 h-4'/>
                    </Button>
                </div>

            </CardContent>

        </Card>
    </div>
  )
}

export default FreeCounter