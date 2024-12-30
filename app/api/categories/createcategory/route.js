import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req)  {
    const body = await req.json();
    console.log(body.name)
    const count = await prisma.category.count({
        where: {
            nom: body.name,
        },
    });
    if(count > 0){
        return NextResponse.json({success:false,error:"Category already exists"});
    }
    try{
        await prisma.category.create({
            data: {
                nom: body.name,
                
            },
        });

        //find id of category
        const category = await prisma.category.findFirst({
            where: {
                nom: body.name,
            },
        });

        return NextResponse.json({success:true, message:"Category created", id:category.id_cat, category:body.name});
    }
    catch(e){
        return NextResponse.json({success:false,error:e});
    }

}