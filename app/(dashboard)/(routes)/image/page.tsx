'use client'

import axios, { Axios } from 'axios'

import * as z from 'zod'
import Heading from '@/components/Heading'
import { Download, ImageIcon, LucideRefreshCw, MessageSquare, RefreshCcw, RefreshCcwIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {formSchema,amountOptions} from './constants'
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
import { useAxios } from '@/lib/useAxios'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { usePromodal } from '@/hooks/useProModal'







const monteserat = Nobile({
    subsets:['latin'],
    weight:'400'

})

const page = () => {
    const promodal = usePromodal()
    const router = useRouter()
    const [mounted,setMounted] = useState(false)
    const [images,setImages] = useState<string[]>([])
    const [refresh,setRefresh] = useState<boolean>(false)

    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount:'1'
        }
    })

    const isLoading = form.formState.isSubmitting
    const onSubmit = async(values:z.infer<typeof formSchema>)=>{
        setImages([])
        const options =  {
            method: 'POST',
            url: 'https://open-ai21.p.rapidapi.com/texttoimage2',
            headers: {
              'x-rapidapi-key': '976c9856f8msh17842d5460cb630p1796b5jsnef2e6c30d90a',
              'x-rapidapi-host': 'open-ai21.p.rapidapi.com',
              'Content-Type': 'application/json'
            },
            data: {text: values.prompt}
          };
        try {
            
            const apiLimitResp = await axios.get('/api/image')
            const response = await useAxios(options,values.amount)
            console.log('apiLimitRes ==>',apiLimitResp)
            console.log(response,'response')
            setImages(response)
        }catch (error:any) {
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
        <Heading 
        title='Image Generation'
        description='Turn your prompt into an image.'
        icon={ImageIcon}
        iconColor='text-pink-700'
        bgColor='bg-pink-700/10'
        />
        <div className='px-4 lg:px-8 '>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                className='rounded-lg focus-within:shadow-sm border w-full p-3 grid grid-cols-12 gap-2'>
                    <FormField 
    
                    name='prompt'
                    render={({field})=>(
                        <FormItem className='col-span-12 md:col-span-8'>
                            <FormControl>
                                <Input className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent placeholder-shown:text-xs '
                                 placeholder='An alien holding a dog...' {...field} disabled={isLoading}/>
                            </FormControl>
                        </FormItem>
                    )}/>
                    <FormField
                    control={form.control}
                    name='amount'
                    render={({field})=>(
                        <FormItem
                        className='col-span-12 md:col-span-2 outline-none border-none'>
                            <Select
                             
                            onValueChange={field.onChange}
                            value={`${field.value}`}
                            defaultValue={`${field.value}`}
                            >
                            <FormControl>
                                <SelectTrigger className='w-full'>
                                    <SelectValue defaultValue={field.value} />
                                </SelectTrigger>
                            </FormControl>
                                <SelectContent>
                                    {amountOptions.map(amount=>(
                                        <SelectItem key={amount.value} value={`${amount.value}`}>{amount.label}</SelectItem>
                                    ))}
                            
                                </SelectContent>
                            </Select>

                        </FormItem>

                    )}
                    />
                    
                    <Button  className='bg-slate-900 w-full col-span-12 md:col-span-2' disabled={isLoading}>
                        Generate
                    </Button>

                </form>

            </Form>
            {images.length===0 && !isLoading && <Empty label='No Image generated'/>}
            {isLoading && <div className='flex mt-6 flex-col items-center justify-center w-full bg-gray-500/5 rounded-md p-2 border shadow-md'>
                    <BotAvatar classname='animate-spin'/>
                    <p className='text-sm text-muted-foreground'>Genius is thinking</p>

                </div>}
            <div className='grid md:grid-cols-5 grid-cols-2 mt-4 gap-3'>
                {images.map((image) => (
                    <Card key={image} className='rounded-lg'>
                        <CardContent className='p-2'>

                            <div className='relative aspect-square rounded-lg'>
                                <Image
                                src={image}
                                fill
                                sizes=''
                            
                                alt='image'
                                className='object-cover '
                                />
                            </div>
                        </CardContent>
                        <CardFooter className='p-2'>
                            <Button
                            onClick={()=>window.open(image)}
                            variant={'secondary'}
                            className='w-full p-0'>
                                <Download className='h-4 w-4'/>
                                Dowload
                            </Button>

                        </CardFooter>
                        

                    </Card>
                ))}
                
               
            </div>

        </div>
    </div>
  )
}

export default page