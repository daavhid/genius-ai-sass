'use client'

import axios from "axios";
import { number } from "zod";

interface optionsI{
    method: string;
    url: string;
    headers:any
    data:{text:string}
}

interface headers{

}

export const useAxios = async(options:optionsI,image_num='1') => {
    const amount = Number(image_num)
    const datas = []
    for(let i=0;i<amount;i++){
        const response  = await axios.request(options)
         datas.push(response.data.generated_image)

    }
    return datas
}