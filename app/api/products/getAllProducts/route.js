import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
    let products = null;
    try {
        products = await prisma.product.findMany();
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error });
    }
    if (!products) {
        return NextResponse.json({ success: false, error: 'Products not found' });
    }
    let categorieNames = [];

    for (const product of products) {
        for (const categorie of product.categories) {
            let categorieName = await prisma.category.findUnique({
                where: {
                    id_cat: categorie
                }
            });
            if (categorieName) {
                categorieNames.push(categorieName.nom);
            }
        }
    }
    
    return NextResponse.json({
        success: true, products: products.map(product => ({
            title: product.title,
            slug: product.title,
            moreLove: true,
            id: product.id,
            price: product.price,
            desc: product.desc,
            images: product.images,
            gallery: product.images,
            condition: "new",
            vendor: product.brand,
            color: null,
            brand: product.brand,
            categories: product.categories,
            categoriesNames:categorieNames,
            discount: {
                banner: null,
                percentage: null,
                expireDate: null,
                isActive: false
            },
            variations: null,
            weight: product.weight,
            tags: product.tags,
            sizes: null,
            stock: product.stock,
            review: null,
            rating: null,
            ratingScore: null,
            created: product.createdAt,
        }))
    });
}