import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { adminMiddleware } from '../../middleware';
import { sendToAllClients } from '../../ws/route';

export const POST = async (req: NextRequest) => {
  const { categoryId } = await req.json();

  const middlewareResult = await adminMiddleware(req);
  if (middlewareResult) {
    return middlewareResult;
  }

  if (!categoryId) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  const categoryExists = await prisma.categories.findUnique({
    where: {
      id: categoryId,
    },
  });

  if (!categoryExists) {
    return NextResponse.json({ message: 'Category not found' }, { status: 404 });
  }

  await prisma.categories.delete({
    where: {
      id: categoryId,
    },
  });

  sendToAllClients(JSON.stringify({ event: 'categoryDeleted', data: { categoryId } }));

  return NextResponse.json({ message: 'Category deleted' }, { status: 201 });
};
