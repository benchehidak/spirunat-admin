import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req)  {
    const body = await req.json();
    console.log("boddyyyy",body);
    let product = null;
    try {
        product = await prisma.product.findUnique({
            where: {
                id: body.productId
            }
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error });
    }
    if (!product) {
        return NextResponse.json({ success: false, error: 'Product not found' });
    }
    
    return NextResponse.json({ success: true, product:{
        title: product.name,
        slug: product.name,
        moreLove:true,
        id: product.id,
        price: product.price,
        desc: product.description,
        images: product.images,
        gallery: product.images,
        condition: product.condition,
        vendor: product.brand,
        color:product.color,
        brand: product.brand,
        categories: product.categories,
        discount: product.discount,
        variations:product.variations,
        weight: product.weight,
        tags: product.tags,
        sizes:product.sizes,
        stock: product.qte,
        review:product.review,
        rating: product.rating,
        ratingScore: product.ratingScore,
        created: product.createdAt,
    }});
}

