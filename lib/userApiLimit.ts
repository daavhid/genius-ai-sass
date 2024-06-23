import { auth } from "@clerk/nextjs/server"
import prismaDb from "./prisma"
import { MAX_API_LIMIT } from "@/constant"


export const increaseApiLimit = async()=>{
    const {userId} = auth()
    if(!userId){
        return false
    }
    // create the instance for the model
    const userApiLimit = await prismaDb.userApiLimit.findUnique({
        where: {userId},
    })
    if(userApiLimit){
        await prismaDb.userApiLimit.update({
            where: {userId:userId},
            data:{count:userApiLimit.count+1},
        })
        
    }
    else{
        await prismaDb.userApiLimit.create({
            data:{userId:userId,count:1},
        })
    }
}

export const checkApiLimit = async()=>{
    const {userId} = auth()
    if(!userId){
        return false
    }
    const userApiLimit = await prismaDb.userApiLimit.findUnique({
        where:{userId}
    })

    if(!userApiLimit || userApiLimit.count < MAX_API_LIMIT){
        return true
    }else{
        return false
    }

}

export const getApiLimitCount = async ()=>{
    const {userId} = auth()
    if(!userId){
        return 0
    }
    const userApiLimit = await prismaDb.userApiLimit.findUnique({
        where:{userId}
    })
    if(!userApiLimit){
        return 0
    }
    return userApiLimit.count

}