// import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
export const GET = async (req: Request) => {
    // const session = await auth()
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const after = parseInt(searchParams.get('after') || '0', 10);
    const category = searchParams.get('category');

    const logs = await prisma.logs.findMany({
        where: {
            category: category || undefined
        },
        skip: after,
        take: limit,
    });

    return NextResponse.json(logs, { status: 200 });
}