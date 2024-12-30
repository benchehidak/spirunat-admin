import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req)  {
    const body = await req.json();
    const product = await prisma.product.create({
        data: {
            title: body.title,
            slug: body.slug,
            price: body.price,
            desc: body.desc,
            images: body.images || [],
            gallery: body.gallery || [],
            condition: body.condition || "new",
            vendor: body.vendor || null,
            color: body.color || "",
            brand: body.brand || "",
            categories: body.categories || [],
            subcategories: body.subcategories || [],
            variations: body.variations || "",
            weight: body.weight || 0,
            tags: body.tags || [],
            sizes: body.sizes || [],
            stock: body.stock || 0,
            active: body.active !== undefined ? body.active : true,
            moreLove: body.moreLove !== undefined ? body.moreLove : false,
        },
    });
    return NextResponse.json({ success: true, product });
}