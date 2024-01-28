import { connect } from "@/app/api/mongo.config";
import { Coupon } from "@/models/Coupon";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest, {params}: {params:{slug : string}}) {

    try {
        connect();
        const { slug } = params;    
        const body = await req.json()
        const findUser = await Coupon.findById(slug);
        if(findUser){
            await Coupon.updateOne(findUser, { $set: { status: body.status } })
            return NextResponse.json({
                status: 200,
                message: 'Coupon update successfully!'
            })        
        }else{
            return NextResponse.json(findUser)
        }
    } catch (error) {
        throw new Error('failed to fetch')
    }
}
