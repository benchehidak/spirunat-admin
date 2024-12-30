import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

const prisma = new PrismaClient();

export async function POST(req)  {
    const body = await req.json();
    const { id } = body;

    const product = await prisma.product.findUnique({
        where: {
            id: new ObjectId(id)
        }
    });

    if (!product) {
        return NextResponse.json({ success: false, message: 'Product not found' });
    }

    try {
        await prisma.product.delete({
            where: {
                id: new ObjectId(id)
            }
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error });
    }

    return NextResponse.json({ success: true, message: 'Product deleted successfully' });
}