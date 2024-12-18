import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  const { categoryId } = await req.json();
  const session = await auth();

  if (!session) {
    return new Response('Unauthorized', { status: 401 });
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
    return NextResponse.json({ message: 'Category not found', error: true }, { status: 404 });
  }

  await prisma.categories.delete({
    where: {
      id: categoryId,
    },
  });

  return NextResponse.json({ message: 'Category deleted' }, { status: 201 });
};
