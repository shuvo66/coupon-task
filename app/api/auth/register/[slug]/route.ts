import { connect } from "@/app/api/mongo.config";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest, {params}: {params:{slug : string}}) {

    try {
        connect();
        const { slug } = params;    
        const body = await req.json()
        const findUser = await User.findById(slug);
        if(findUser){
            await User.updateOne(findUser, { $set: { status: body.status } })
            return NextResponse.json({
                status: 200,
                message: 'Registration update successfully!'
            })        
        }else{
            return NextResponse.json(findUser)
        }
    } catch (error) {
        throw new Error('failed to fetch')
    }
}
