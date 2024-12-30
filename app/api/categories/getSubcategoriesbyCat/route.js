import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req)  {
    const body=await req.json();
    try {
        const subcategories = await prisma.subcategory.findMany(
            {
                where: {
                    categoryId: body.categoryId,
                }
            }
        );
        
        return NextResponse.json({success:true,subcategories:subcategories});

    } catch (error) {
        console.error(error)
        return NextResponse.json({success:false,error:error});
    }
}