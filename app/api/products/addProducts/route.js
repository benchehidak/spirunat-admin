import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
const path = require('path');

const prisma = new PrismaClient();

export async function POST(req) {
  const data = await req.formData()
  const file = data.get('images')
  console.log(file, 'file')
  if (!file) {
    return NextResponse.json({ success: false })
}
try{
  file.forEach(async image  => 
    {
      const filePath = path.join(process.cwd(), 'public', image.name)

      const fileBuffer = await file.arrayBuffer();

    await fs.writeFile(filePath, Buffer.from(fileBuffer));
  });
}
catch (error) {
  console.log('Error:', error);
  return NextResponse.json({ success: false, error: error.message });
}



  try {
    const product = await prisma.product.create({
      data: {
        categoryId: data.get('categoryId'),
        SubCategoryId: data.get('SubCategoryId'),
        ProductName: data.get('ProductName'),
        Description: data.get('Description'),
        color: data.get('color'),
        brand: data.get('brand'),
        images: data.get('images').name,
        price: data.get('price'),
        weight: data.get('weight'),
        initialStock: data.get('initialStock'),
      },
    });
    console.log('Product:', product);
    return NextResponse.json({ success: true, product });

  } catch (error) {
    console.log('Error:', error);
    return NextResponse.json({ success: false, error: error.message });
  }
}