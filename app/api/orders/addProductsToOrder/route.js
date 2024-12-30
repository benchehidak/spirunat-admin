import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { validationResult } from 'express-validator';

const prisma = new PrismaClient();

export async function POST(req)  {
    const body = await req.json();
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return NextResponse.json({ success: false, errors: errors.array() });
    }

    const order = await prisma.order.update({
        where: { 
            id: body.id
        },
        data: { 
            products: {
                push: body.products.map(product => ({
                    idProd: product.idProd,
                    qte: product.qte,
                }))
            }
        }
    });

    return NextResponse.json({ success: true, order });
}