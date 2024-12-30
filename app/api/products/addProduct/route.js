import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { promises as fs } from 'fs';
const path = require('path');

export async function POST(req) {
    const prisma = new PrismaClient();
    const data = await req.formData();
    const images = data.getAll('images'); // Assuming 'images' is the field name for multiple images

    if (!images || images.length === 0) {
        return NextResponse.json({ success: false });
    }

    const uploadDir = path.resolve(process.cwd(), 'public', 'images', 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    const imageNames = [];

    for (const image of images) {
        const uploadPath = path.join(uploadDir, image.name);
        const fileBuffer = await image.arrayBuffer();
        await fs.writeFile(uploadPath, Buffer.from(fileBuffer));
        imageNames.push(image.name);
    }
    const categories = data.getAll('categoryId')[0].includes(',') ? data.getAll('categoryId')[0].split(',') : [data.get('categoryId')];
    const subcategories = data.getAll('SubCategoryId')[0].includes(',') ? data.getAll('SubCategoryId')[0].split(',') : [data.get('SubCategoryId')];
    console.log('split', data.getAll('categoryId')[0].split(','));
    try {
        const product = await prisma.product.create({
          data: {
            categories: categories,
            subcategories: subcategories,
            title: data.get('ProductName'),
            desc: data.get('Description'),
            color: data.get('color'),
            brand: data.get('brand'),
            images: imageNames,
            price: parseFloat(data.get('price')),
            weight: parseFloat(data.get('weight')),
            stock: parseInt(data.get('initialStock')),
          },
        });
        console.log('Product:', product);
        return NextResponse.json({ success: true, product });
    
      } catch (error) {
        console.log('Error:', error);
        return NextResponse.json({ success: false, error: error.message });
      }
}