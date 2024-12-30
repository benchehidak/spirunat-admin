import { NextResponse } from "next/server";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req) {
    const { nom, prenom,email, password } = await req.json();
    const hash = await bcrypt.hash(password,10);

    const newUser = await prisma.User.create({
        data: {
            nom,
            prenom,
            email,
            hash,
        },
    });
    return NextResponse.json({success:true});
}