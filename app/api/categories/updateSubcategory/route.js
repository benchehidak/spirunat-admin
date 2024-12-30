
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PUT(req)  {
    const body = await req.json();
    //console.log(body);
    const existingSubcategory = await prisma.subcategory.findFirst({
        where: {
            nom: body.name,
            categoryId: body.categoryId,
        },
    });
    if(!existingSubcategory){
        return NextResponse.json({success:false,error:"Subcategory doesn't exist"});
    }
    //console.log(existingSubcategory);
    try{
        await prisma.subcategory.update({
            where: {
                id_subcat: existingSubcategory.id_subcat,
            },
            data: {
                nom: body.newname|| existingSubcategory.nom,
            },
        });
    }
    catch(e){
        console.error(e);
        return NextResponse.json({success:false,error:e});
    }
    return NextResponse.json({success:true});
}
