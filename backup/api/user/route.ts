import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
    const session = await auth();

    if (!session) {
        return new Response('Unauthorized', { status: 401 });
    }

    const user = await prisma.users.findFirst({
        where: {
            email: session?.user?.email
        }
    });

    return NextResponse.json(user);
}