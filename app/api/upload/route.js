
import { NextResponse } from "next/server";
import { promises as fs } from 'fs';
const path = require('path');

export async function POST(req) {

    const data = await req.formData()
    const file = data.get('file')
    if (!file) {
        return NextResponse.json({ success: false })
    }
    const uploadPath = path.resolve(__dirname, '..', '..', '..', '..', '..', 'public', file.name);

    const fileBuffer = await file.arrayBuffer();

    await fs.writeFile(uploadPath, Buffer.from(fileBuffer));

    return NextResponse.json({ success: true });

};  