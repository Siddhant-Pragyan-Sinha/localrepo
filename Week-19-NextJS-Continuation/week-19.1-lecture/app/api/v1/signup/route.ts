import { NextRequest, NextResponse } from 'next/server';
import client from '@/app/lib/db';



export async function POST(req: NextRequest) {
    const data = await req.json();
    // should add zod validation here
    const user = await client.user.create({
        data: {
            username: data.username,
            password: data.password
        }
    });

    console.log(user.id);

    return NextResponse.json({ message: "Signed up" });
}

export async function GET() {
    const user = await client.user.findFirst({});
    return NextResponse.json({ name: user?.username, email: user?.username })
}