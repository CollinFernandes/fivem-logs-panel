import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

interface Category {
    id: number;
    name: string;
    groups: Group[];
}

interface Group {
    id: number;
    name: string;
    roleId: string;
    isAdmin: boolean;
}

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
    const allowedGroups = await prisma.groups.findMany();

    const newCategories: Category[] = [];
    categories.forEach(category => {
        newCategories.push({
            id: category.id,
            name: category.name,
            groups: allowedGroups.filter(group => group.id <= category.group)
        });
    });

    console.log(newCategories)

    return NextResponse.json(newCategories, { status: 200 });
}