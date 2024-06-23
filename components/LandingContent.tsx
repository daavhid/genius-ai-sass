import { Avatar } from '@radix-ui/react-avatar'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const testimonials = [
    {
        name:'Daavhid Toyosi',
        Avatar:'A',
        title:'Software Engineer',
        comment:"ths is the best software I've used "
    },
    {
        name:'Daavhid Toyosi',
        Avatar:'A',
        title:'Software Engineer',
        comment:"ths is the best software I've used "
    },
    {
        name:'Daavhid Toyosi',
        Avatar:'A',
        title:'Software Engineer',
        comment:"ths is the best software I've used "
    },
    {
        name:'Daavhid Toyosi',
        Avatar:'A',
        title:'Software Engineer',
        comment:"ths is the best software I've used "
    },
    {
        name:'Daavhid Toyosi',
        Avatar:'A',
        title:'Software Engineer',
        comment:"ths is the best software I've used "
    }
]

const LandingContent = () => {
  return (
    <div className='px-10 pb-20'>
        <div className='font-extrabold text-4xl sm:text-5xl md:text-6xl py-10'>

            <h1 className='text-white text-center'>Testimonials</h1>
        </div>
        <div className='grid grid-cols-2 gap-3  md:grid-cols-3 lg:grid-cols-4 place-items-center    xl:grid-cols-5 '>
            {testimonials.map(testimonial=>(
                <Card key={testimonial.name} className='bg-slate-400/10 border-0 mx-auto'>
                    <CardHeader>
                        <CardTitle>
                            <div className='text-white'>
                                <p className='text-base'>{testimonial.name}</p>
                                <p className='text-xs text-zinc-400 '>{testimonial.title}</p>
                            
                            </div>
                        </CardTitle>
                        <CardContent className='pt-4 px-0 text-white'>
                            {testimonial.comment}
                        </CardContent>
                    </CardHeader>

                </Card>
            ))}

        </div>
    </div>
  )
}

export default LandingContent