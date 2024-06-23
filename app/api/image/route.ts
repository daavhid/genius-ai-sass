import { useAxios } from "@/lib/useAxios";
import { checkApiLimit, increaseApiLimit } from "@/lib/userApiLimit";
import { NextRequest, NextResponse } from "next/server";



export async function GET(){
    try{

        const freeTrial = await checkApiLimit()
    
        if(!freeTrial){
            return new NextResponse('Free trial expired',{status:403})
        }

        await increaseApiLimit()

        return NextResponse.json({},{status:200})
        
    }catch{
        return new NextResponse('Internal server error ', {status:505})

    }
}