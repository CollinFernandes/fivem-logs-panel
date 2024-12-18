import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
export const GET = async () => {
    const session = await auth()

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.users.findFirst({
        where: {
            email: session.user?.email
        }
    });

    if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const categories = await prisma.categories.findMany();
    const allowedCategories = categories.filter(category => category.group >= (user?.group ?? 0));

    console.log(JSON.stringify(allowedCategories));

    return NextResponse.json(allowedCategories, { status: 200 });
}