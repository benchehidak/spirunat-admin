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

    const order = await prisma.order.create({
        data: {
            products: body.products.map(product => ({
                idProd: product.idProd,
                qte: product.qte,
            })),
            totalAmount: body.totalAmount,
            status: 'pending',
            deliveryAdress: {
                street: body.deliveryAdress.street,
                city: body.deliveryAdress.city,
                state: body.deliveryAdress.state,
                zipCode: body.deliveryAdress.zipCode,
            },
            paymentMethod: body.paymentMethod,
            deliveryMethod: body.deliveryMethod,
            deliveryInfo: {

                deliveryDate: body.deliveryInfo.deliveryDate,
                deliveryTime: body.deliveryInfo.deliveryTime,
                deliveryFee: body.deliveryInfo.deliveryFee,
                delivery_carrier: body.deliveryInfo.delivery_carrier,
                tracking_number: body.deliveryInfo.tracking_number,
            },
            discount: {
                amount: body.discount.amount,
                percentage: body.discount.percentage,
            },
        },
    });
    
    return NextResponse.json({ success: true, order });
}