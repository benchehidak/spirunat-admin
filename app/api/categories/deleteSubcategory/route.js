import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
    const body = await req.json();
    try {
        const existingSubcategory = await prisma.subcategory.findFirst({
            where: {
                id_subcat: body.id_subcat,
                categoryId: body.categoryId
            },
        });
        if (!existingSubcategory) {
            throw new Error("Subcategory doesn't exist");
        }

        await prisma.subcategory.delete({
            where: {
                id_subcat: body.id_subcat,
            },
        });
        return NextResponse.json({ success: true, message: `Subcategory ${existingSubcategory.nom} deleted`  });
    } catch (e) {
        return NextResponse.json({ success: false, error: e.message });
    }
}