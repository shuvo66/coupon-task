import { NextRequest, NextResponse } from "next/server";
import { connect } from "../mongo.config";
import { User } from "@/models/User";


export async function GET(req:NextRequest) {
    try {
        connect();
        const couponList = await User.find();
        if(couponList) return NextResponse.json({status: 200, data: couponList})
    } catch (error) {
        throw new Error('Failed to Fetch')
    }
}

