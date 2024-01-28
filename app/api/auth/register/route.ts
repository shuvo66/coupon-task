import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../mongo.config";
import { User } from "@/models/User";

interface UserPayload {
    name: string;
    email?: string;
    password?: string;
  }
  
  connect();
  
export async function POST(req:NextRequest) {
    try{
        const body: UserPayload = await req.json();
        try {
            const user = await User.findOne({ email: body.email });
            if(!body?.name){
              return NextResponse.json(
                {
                  status: 400,
                  message: "Name Field must not be Empty!",
                }
              );
            }
            if(!body?.email){
              return NextResponse.json(
                {
                  status: 400,
                  message: "Email Field must not be Empty!",
                }
              );
            }
            if(!body?.password){
              return NextResponse.json(
                {
                  status: 400,
                  message: "Password Field must not be Empty!",
                }
              );
            }
            if (user) {
              return NextResponse.json(
                {
                  status: 400,
                  message: "Email is already used.",
                }
              );
            } else {
              const payload = {
                ...body,
                status: false
              }
              await User.create(payload);
              return NextResponse.json(
                { status: 200, message: "User Created successfully!" },
                { status: 200 }
              );
            }
          } catch (error) {
            return NextResponse.json({ error }, { status: 500 });
          }
    }catch (err) {
        throw new Error("Failed to login!");
    }
}