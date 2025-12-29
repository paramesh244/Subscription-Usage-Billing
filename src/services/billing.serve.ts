import { Request,Response } from "express";

import {prisma} from "../prisma/client"

const getMonthRange =()=>{
    const start = new Date()
    start.setDate(1)
    start.setHours(0,0,0,0)

    const end = new Date(start)
    end.setMonth(end.getMonth() + 1)

    return {start,end}
}

export const getCurrentUsage = async (req:Request,res:Response)=>{

    const userId = Number(req.params.id)

    const {start,end} = getMonthRange()

    const subscription = await prisma.subscription.findFirst({
        where:{userId,isActive:true},
        include:{plan:true}
    })


    if(!subscription){
        return res.status(404).json({message:"No active sunbscriptions"})
    }

    const totalUsed = await prisma.usageRecord.aggregate({
        where:{
            userId,
            createdAt:{gte:start,lt:end}
        },
        _sum:{usedUnits:true}
    })


    const used = totalUsed._sum.usedUnits || 0

    res.json({
        totalUsed:used,
        remainingUnits:subscription.plan.monthlyQuota-used,
        plan:subscription.plan
    })
}


export const getBillingSummary=async(req:Request,res:Response)=>{

    const userId = Number(req.params.id)

      const {start,end} = getMonthRange()

    const subscription = await prisma.subscription.findFirst({
        where:{userId,isActive:true},
        include:{plan:true}
    })


    if(!subscription){
        return res.status(404).json({message:"No active sunbscriptions"})
    }


    const usageAgg = await prisma.usageRecord.aggregate({
        where:{
            userId,
            createdAt:{gte:start,lt:end}
        },
        _sum:{usedUnits:true}
    })

    const totalUsage = usageAgg._sum.usedUnits || 0
    const quota = subscription.plan.monthlyQuota

    const extraUnits = Math.max(0,totalUsage-quota)

    const extraCharges = Number(
        (extraUnits * Number(subscription.plan.extraChargePerUnit)).toFixed(2)
    )

    res.json({
        totalUsage,
        plaQuota:quota,
        extraUnits,
        extraCharges,
        plan:subscription.plan

    })
}