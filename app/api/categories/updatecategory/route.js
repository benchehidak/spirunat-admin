import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PUT(req)  {
    const body = await req.json();
    // console.log(body);
    const existingCategory = await prisma.category.findFirst({
        where: {
            nom: body.name,
        },
    });
    if(!existingCategory){
        return NextResponse.json({success:false,error:"Category doesn't exist"});
    }
    // console.log(existingCategory);
    try{
        await prisma.category.update({
            where: {
                id_cat: existingCategory.id_cat,
            },
            data: {
                nom: body.newname|| existingCategory.nom,
            },
        });
    }
    catch(e){
        console.log(e)
        return NextResponse.json({success:false,error:e});
    }
    return NextResponse.json({success:true});

}
