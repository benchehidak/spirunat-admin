import { NextResponse } from "next/server";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req) {
    const { username,password,adminlvl } = await req.json();
    const hash = await bcrypt.hash(password,10);
    try{
        await prisma.admin.create({
            data: {
                user:username,
                password:hash,
                adminlvl,
            },
        });
    }catch(e){
        return NextResponse.json({success:false,error:e});
    }

    return NextResponse.json({success:true});
}