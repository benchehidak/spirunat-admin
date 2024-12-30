
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

const prisma = new PrismaClient();

export async function POST(req)  {
    const body = await req.json();
    // console.log(body);
    let existingCategory;
    try {
        existingCategory = await prisma.category.findUnique({
            where: {
                id_cat: body.id,
            },
        });
        if(!existingCategory){
            return NextResponse.json({success:false,error:"Category not found"});
        }
        return NextResponse.json({success:true, category:existingCategory});
    } catch (error) {
        //console.log(error)
        return NextResponse.json({success:false,error:error});
    }

}