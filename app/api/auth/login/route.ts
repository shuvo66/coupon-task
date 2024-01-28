import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../mongo.config";
import { User } from "@/models/User";

interface UserPayload {
    email?: string;
    password?: string;
  }
  
  connect();
  
export async function POST(req:NextRequest) {
    try{
        const body: UserPayload = await req.json();
        const user = await User.findOne({ email: body.email });

        if(user) {
            const checkPassword = body.password === user.password
            if (checkPassword) {
              return NextResponse.json(
                { status: 200, message: "User Logged in successfully!", data: user },
                { status: 200 }
              );
            }
            return NextResponse.json(
              {
                status: 400,
                message: "Please check your credentials.",
              },
            );
          } else  {
            return NextResponse.json(
              {
                status: 400,
                message:"No User found in our system with above email.",
              } )     
          }
    }catch (err) {
        throw new Error("Failed to login!");
    }
}