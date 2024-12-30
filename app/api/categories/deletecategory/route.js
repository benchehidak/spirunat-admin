
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
    const body = await req.json();
    const existingCategory = await prisma.category.findFirst({
        where: {
            id_cat: body.id_cat,
        },
    });
    if(!existingCategory){
        return NextResponse.json({success:false,error:"Category doesn't exist"});
    }
    try{
        await prisma.category.delete({
            where: {
                id_cat: body.id_cat,
            },
        });
    }
    catch(e){
        console.log(e)
        return NextResponse.json({success:false,error:e});
    }
    return NextResponse.json({success:true});

}