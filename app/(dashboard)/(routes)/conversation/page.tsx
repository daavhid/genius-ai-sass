'use client'

import axios from 'axios'

import * as z from 'zod'
import Heading from '@/components/Heading'
import { LucideRefreshCw, MessageSquare, RefreshCcw, RefreshCcwIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import formSchema from './constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Messages } from 'openai/resources/beta/threads/messages.mjs'
import UserAvater from '@/components/UserAvater'
import BotAvatar from '@/components/BotAvatar'
import parseTextToJSX from '@/lib/parser'
import { Nobile, } from 'next/font/google'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Empty from '@/components/Empty'
import Markdown from 'react-markdown'
import { usePromodal } from '@/hooks/useProModal'

interface Message{
    role: string,
    content:string
}

const TextParser = ({text}:{text:string})=>{
    return (
        <div className='leading-loose'>
            {parseTextToJSX(text)}
        </div>
    )
}



const monteserat = Nobile({
    subsets:['latin'],
    weight:'400'

})

const page = () => {
    const promodal = usePromodal()
    const router = useRouter()
    const [Messages,setMessages] = useState<Message[]>([])
    const [refresh,setRefresh] = useState<boolean>(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        }
    })

    const isLoading = form.formState.isSubmitting
    const onSubmit = async(values:z.infer<typeof formSchema>)=>{
        try {
            const userMessage = {
                role:'user',
                content:values.prompt
            }
            const newMessages = [...Messages,userMessage]

            const response = await axios.post('/api/conversation',{
                message:userMessage.content
            })
            

            setMessages((prev)=>[...prev,userMessage,response.data])
            console.log(response.data,'this is the data')
            
        } catch (error:any) {
            if(error.response?.status===403) {
                promodal.onOpen()
            }
            
        }finally{
            router.refresh()
        }
        form.reset()
    }
  return (
    <div className='space-y-4 pb-8 relative'>
        {Messages.length!==0 && 
            <LucideRefreshCw onClick={()=>{
                setRefresh(true)
                setTimeout(()=>{
                    setMessages([])
                    setRefresh(false)

                },2000)
            }} className={cn(' absolute right-10 text-muted-foreground top-5 cursor-pointer ',(refresh&&Messages.length!==0)?'animate-spin':'animate-none')}/>
        }
        <Heading 
        title='Conversation'
        description='Our most advanced conversation model.'
        icon={MessageSquare}
        iconColor='text-violet-500'
        bgColor='bg-violet-500/10'
        />
        <div className='px-4 lg:px-8 '>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                className='rounded-lg focus-within:shadow-sm border w-full p-3 grid grid-cols-12 gap-2'>
                    <FormField 
                    name='prompt'
                    render={({field})=>(
                        <FormItem className='col-span-12 md:col-span-10'>
                            <FormControl>
                                <Input className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent placeholder-shown:text-xs '
                                 placeholder='How do i calculate the radius of a circle...' {...field} disabled={isLoading}/>
                            </FormControl>
                        </FormItem>
                    )}/>
                    
                    <Button  className='bg-slate-900 w-full col-span-12 md:col-span-2' disabled={isLoading}>
                        Generate
                    </Button>

                </form>

            </Form>
            {Messages.length===0 && !isLoading && <Empty label='No conversation opened'/>}
            {isLoading && <div className='flex mt-6 flex-col items-center justify-center w-full bg-gray-500/5 rounded-md p-2 border shadow-md'>
                    <BotAvatar classname='animate-spin'/>
                    <p className='text-sm text-muted-foreground'>Genius is thinking</p>

                </div>}
            <div className='mt-4 flex flex-col-reverse gap-y-4'>
                
                {Messages.map(message => {
                    return(
                        <div key={message.content} className={`flex p-2 overflow-hidden  items-center gap-x-4 ${message.role==='user'?'bg-white/10  rounded-md' :'bg-gray-500/5 rounded-md '} border shadow-md`}>
                            <div className={'self-start'}>

                                {message.role==='user' ? <UserAvater/> : <BotAvatar />}
                            </div>
                            <div className={cn(monteserat.className,message.role==='user'?'text-muted-foreground text-sm ':'text-sm','flex-1 shrink-0 overflow-auto')}>
                                {message.role==='user'? message.content:
                                    <Markdown className={'leading-4 p-1 w-full overflow-auto'}
                                    components={{
                                        pre:({node,...props})=>(
                                            <div className='overflow-auto w-full bg-black/10 p-4 my-4'>
                                                <pre{...props}/>
                                            </div>
                                        ),
                                        code:({node,...props})=>(
                                            <code className='bg-black/10 rounded-lg p-1' {...props}/>
                                        ),
                                        li:({children,node,...props})=>(
                                            <li className='my-4' {...props}>
                                                {children}
                                            </li>
                                        ),
                                        ul:({children,node,...props})=>(
                                            <ul className='mt-4 ' {...props}>{children}</ul>
                                        ),
                                        p:({node,...props})=>(
                                            <p className=' w-full p-2' {...props}/>
                                        )
                                        
                                    }}>
                                        {message.content}
                                    </Markdown>
                                }
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    </div>
  )
}

export default page