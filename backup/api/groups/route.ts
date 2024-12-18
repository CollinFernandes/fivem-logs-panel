import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
    const groups = await prisma.groups.findMany();
    return NextResponse.json(groups);
};