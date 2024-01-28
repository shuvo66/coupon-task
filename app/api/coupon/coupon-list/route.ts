import { Coupon } from "@/models/Coupon";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../mongo.config";


export async function GET(req:NextRequest) {
    try {
        connect();
        const couponList = await Coupon.find();
        if(couponList) return NextResponse.json({status: 200, data: couponList})
    } catch (error) {
        throw new Error('Failed to Fetch')
    }
}

