import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req)  {
    const prisma = new PrismaClient();
    const body = await req.json();
    console.log("Body", body);

    if(body.deliveryInfo == undefined){
        console.log("DeliveryInfo", body.deliveryInfo == undefined);
        body.deliveryInfo = {
            deliveryDate: '',
            deliveryTime: '',
            deliveryFee: 0,
            delivery_carrier: '',
            tracking_number: '',
        }
    }
    if(body.discount == undefined){
        console.log("Discount", body.discount == undefined);
        body.discount = {
            amount: 0,
            percentage: 0,
        }
    }

    try {
        console.log("Creating order with data:", body);
        
        // Calculate total product price before delivery fee
        const productTotal = body.products.reduce((sum, product) => sum + (product.price * product.qte), 0);
        
        // Apply delivery fee logic
        let deliveryFee = 0;
        if (productTotal <= 150) {
            deliveryFee = 7; // 7 TND delivery fee for orders <= 150 TND
        }
        // Update delivery fee in the order data
        body.deliveryInfo.deliveryFee = deliveryFee;
        
        // Update the total amount to include delivery fee
        body.totalAmount = productTotal + deliveryFee - body.discount.amount;
        
        for (let i = 0; i < body.products.length; i++) {
            const product = await prisma.product.findUnique({
                where: {
                    id: body.products[i].idProd,
                },
                select: {
                    stock: true,
                    sold: true,
                },
            });
            console.log("requested quantity: ", body.products[i].qte);
                console.log("stock: ", product.stock);
                console.log("sold: ", product.sold);
                console.log("new stock: ", product.stock - product.sold - body.products[i].qte);
        
            if (product && (body.products[i].qte <= (product.stock - product.sold))) {
                
                await prisma.product.update({
                    where: {
                        id: body.products[i].idProd,
                    },
                    data: {
                        sold: {
                            increment: body.products[i].qte,
                        },
                    },
                });
            } else {
                console.log(`Insufficient stock for product ID: ${body.products[i].idProd}`);
                return NextResponse.json({ success: false, error: `Stock insuffisant` });
            }
        }
        const order = await prisma.order.create({
            data: {
                idUser: body.user,
                fname: body.fname,
                lname: body.lname,
                email: body.email,
                phone: body.phone, // Add phone field to the order
                products: body.products.map(product => ({
                    idProd: product.idProd,
                    prodName: product.prodName,
                    qte: product.qte,
                    price: product.price,
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
        
        // Send confirmation emails
        await sendOrderEmails(body, order);
        
        return NextResponse.json({ success: true, order });
    }
    catch(error){
        console.log("Error creating order:", error);
        return NextResponse.json({ success: false, error: error.message });
    }
    finally {
        await prisma.$disconnect();
    }
}

async function sendOrderEmails(orderData, order) {
    try {
        // Validate email exists before sending
        if (!orderData.email || typeof orderData.email !== 'string' || !orderData.email.includes('@')) {
            console.warn('Invalid or missing email address for order confirmation:', orderData.email);
            return; // Skip email sending if email is invalid
        }
        
        const transporter = nodemailer.createTransport({
            host: 'ssl0.ovh.net', 
            port: 465, // Secure SMTP port
            secure: true, // Use SSL/TLS
            auth: {
                user: 'info@spirunat.com',
                pass: "ovhspirunat",
            },
        });

        // Format product list for email
        const productList = orderData.products.map(product => 
            `${product.prodName} - Quantité: ${product.qte} - Prix: ${product.price.toFixed(3)}TND`
        ).join('<br>');

        // Email to customer - with validation
        if (orderData.email) {
            await transporter.sendMail({
                from: 'info@spirunat.com',
                to: orderData.email,
                subject: 'Confirmation de votre commande Spirulinat',
                html: `
                    <h1>Merci pour votre commande!</h1>
                    <p>Bonjour ${orderData.fname} ${orderData.lname},</p>
                    <p>Nous avons bien reçu votre commande #${order.id}. Elle est en cours de traitement.</p>
                    <h2>Détails de votre commande:</h2>
                    <p><strong>Produits:</strong></p>
                    <p>${productList}</p>
                    <p><strong>Montant total:</strong> ${orderData.totalAmount.toFixed(3)}TND</p>
                    <p><strong>Méthode de paiement:</strong> ${orderData.paymentMethod}</p>
                    <p><strong>Téléphone:</strong> ${orderData.phone}</p>
                    <p><strong>Adresse de livraison:</strong><br>
                    ${orderData.deliveryAdress.street}<br>
                    ${orderData.deliveryAdress.city}, ${orderData.deliveryAdress.state} ${orderData.deliveryAdress.zipCode}</p>
                    <p>Nous vous informerons lorsque votre commande sera expédiée.</p>
                    <p>L'équipe Spirulinat</p>
                `
            });
        }

        // Email to admin - always send this regardless of customer email
        await transporter.sendMail({
            from: 'info@spirunat.com',
            to: 'info@spirunat.com',
            subject: `Nouvelle commande #${order.id}`,
            html: `
                <h1>Nouvelle commande reçue</h1>
                <p><strong>Commande #${order.id}</strong></p>
                <p><strong>Client:</strong> ${orderData.fname} ${orderData.lname}</p>
                <p><strong>Téléphone:</strong> ${orderData.phone}</p>
                <p><strong>Email:</strong> ${orderData.email || 'Non fourni'}</p>
                <p><strong>Produits:</strong></p>
                <p>${productList}</p>
                <p><strong>Montant total:</strong> ${orderData.totalAmount.toFixed(3)}TND</p>
                <p><strong>Méthode de paiement:</strong> ${orderData.paymentMethod}</p>
                <p><strong>Adresse de livraison:</strong><br>
                ${orderData.deliveryAdress.street}<br>
                ${orderData.deliveryAdress.city}, ${orderData.deliveryAdress.state} ${orderData.deliveryAdress.zipCode}</p>
            `
        });

        console.log('Order confirmation emails sent successfully');
    } catch (error) {
        console.error('Error sending order confirmation emails:', error);
        // Important: Don't throw the error as it would prevent order creation
    }
}