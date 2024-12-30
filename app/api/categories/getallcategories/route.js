
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req)  {
    try {
        const categories = await prisma.category.findMany();
        
        return NextResponse.json({success:true,categories:categories});

    } catch (error) {
        console.log(error)
        return NextResponse.json({success:false,error:error});
    }
}