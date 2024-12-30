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

        const oldCategory = await prisma.category.findFirst({
            where: {
                id_cat: body.categoryId,
            },
        });

        const newCategory = await prisma.category.findFirst({
            where: {
                id_cat: body.newCategoryId,
            },
        });

        if (!existingSubcategory) {
            throw new Error("Subcategory doesn't exist");
        }

        await prisma.subcategory.update({
            where: {
                id_subcat: body.id_subcat,
            },
            data: {
                categoryId: body.newCategoryId,
            },
        });
        return NextResponse.json({ success: true, message: `Subcategory ${existingSubcategory.nom} transfered from ${oldCategory.nom} to ${newCategory.nom}`});
    } catch (e) {
        return NextResponse.json({ success: false, error: e.message });
    }
}