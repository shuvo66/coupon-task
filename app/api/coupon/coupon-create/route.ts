import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../mongo.config";
import { Coupon } from "@/models/Coupon";

interface CouponCreate {
    user_name: string;
    roll: number;
    email: string;
    school_name: string;
    class_name: number;
    status: boolean;
}

export async function POST(req:NextRequest) {
    try {
        connect();

        const body: CouponCreate = await req.json();
        try {
            const findCoupon = await Coupon.findOne({email: body.email})
            if(findCoupon){
                return NextResponse.json(
                    {
                      status: 400,
                      message: "Email is already used.try another one",
                    });
            }else{
                const payload = {
                    ...body,
                    status: false
                }
                await Coupon.create(payload);
                return NextResponse.json({
                    status: 200,
                    message: 'Coupon created successfully!'
                })
            }

         } catch (error) {
            return NextResponse.json({ error }, { status: 500 });
        }
    } catch (error) {
        throw new Error('Failed to create')
    }
}
