import {Request,Response} from "express"

import {prisma} from "../prisma/client"

export const recordUsage = async (req:Request,res:Response)=>{

    const {userId,action,usedUnits} = req.body
   
    const usage = await prisma.usageRecord.create({
        data:{userId,action,usedUnits}
    })

    res.status(201).json(usage)
}