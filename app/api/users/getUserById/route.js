import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
    const body = await req.json();
    try{
        const user = await prisma.user.findUnique({
            where: {
                id: body.id
            }
        });
        return NextResponse.json({ success: true, user });
    }
    catch(error){
        return NextResponse.json({ success: false, error });
    }
    finally{
        await prisma.$disconnect();
    }
}