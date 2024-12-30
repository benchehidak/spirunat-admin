import { PrismaClient } from '@prisma/client';
import { stat } from 'fs';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
      const categories = await prisma.category.findMany();
      const allProducts = await prisma.product.findMany();

      const categoriesResult = [];
      const subcategoriesResult = [];

      for (const category of categories) {
        delete category.updatedAt;
        delete category.createdAt;
     
        const productsCount = allProducts.filter(product => product.categories.includes(category.id_cat)).length;
     
        const subcategories = await prisma.subcategory.findMany({
            where: { categoryId: category.id_cat },
        });
     
        const subcategoriesWithCount = [];
     
        for (const subcategory of subcategories) {
            delete subcategory.updatedAt;
            delete subcategory.createdAt;
     
            const subProductsCount = allProducts.filter(product => product.subcategories.includes(subcategory.id_subcat)).length;
     
            subcategoriesWithCount.push({
               ...subcategory,
               productCount: subProductsCount,
               categoryName: category.nom, // assuming 'nom' is the field for category name
               categoryId: category.id_cat,
            });
        }
     
        categoriesResult.push({
            ...category,
            productCount: productsCount,
        });
     
        subcategoriesResult.push(...subcategoriesWithCount);
     }

      return NextResponse.json({ categories: categoriesResult, subcategories: subcategoriesResult });
  } catch (error) {
      return NextResponse.json({ error: error },{status: 500});
  }
}