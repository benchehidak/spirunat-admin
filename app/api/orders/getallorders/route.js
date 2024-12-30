import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req)  {
  
    const order = await prisma.order.findMany();
    //transform all idUser to email
    for (let i = 0; i < order.length; i++) {
        const user = await prisma.util.findUnique({
            where: { id: order[i].idUser }
        });
        order[i].idUser = user.email;
    }
    

    return NextResponse.json({ success: true, order });
}