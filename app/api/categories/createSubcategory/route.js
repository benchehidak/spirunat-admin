import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req)  {
    const body = await req.json();
    console.log(body)
    const existingSubcategory = await prisma.subcategory.count({
        where: {
            nom: body.nom,
            categoryId: body.categoryId
        },
    });
    if(existingSubcategory > 0){
        return NextResponse.json({success:false,error:"Subcategory already exists"});
    }
    try{
        await prisma.subcategory.create({
            data: {
                nom: body.nom,
                categoryId: body.categoryId
            },
        });
        return NextResponse.json({success:true, message:"Subcategory created", subcategory:body.name});
    }
    catch(e){
        console.log(e)
        return NextResponse.json({success:false,error:e});
    }

}