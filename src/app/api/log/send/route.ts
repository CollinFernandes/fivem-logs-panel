import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { sendToAllClients } from '../../ws/route';

export const POST = async (req: NextRequest) => {
  const { token, title, message, identifiers, category } = await req.json();

  if (!token || !title || !message || !identifiers || !category) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  const categoryExists = await prisma.categories.findFirst({
    where: {
      name: category,
    },
  });

  if (!categoryExists) {
    return NextResponse.json({ message: 'Category not found' }, { status: 404 });
  }

  if (token !== categoryExists.token) {
    return NextResponse.json({ message: 'Secret Token is invalid' }, { status: 401 });
  }

  const inserted = await prisma.logs.create({
    data: {
      title,
      category,
      message,
      identifiers: JSON.stringify(identifiers),
      createdAt: new Date().toISOString(),
    },
  });

  sendToAllClients(
    JSON.stringify({
      event: 'newLogInCategory',
      data: {
        category: category,
        entry: { ...inserted, playerData: JSON.parse(inserted.identifiers ?? {}) },
      },
    }),
  );

  return NextResponse.json({ message: 'Log created' }, { status: 201 });
};
