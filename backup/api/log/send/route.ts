import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    const { message, identifiers, category } = await req.json();

    if (!message || !identifiers || !category) {
        return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const categoryExists = await prisma.categories.findFirst({
        where: {
            name: category
        }
    });

    if (!categoryExists) {
        return NextResponse.json({ message: "Category not found" }, { status: 404 });
    }

    const createdAt = new Date().toISOString();

    await prisma.logs.create({
        data: {
            category,
            message,
            identifiers,
            createdAt
        }
    });

    return NextResponse.json({ message: "Log created" }, { status: 201 });
}