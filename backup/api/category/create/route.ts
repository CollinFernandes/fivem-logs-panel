import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  const { name, groupId } = await req.json();
  const session = await auth();

  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  if (!name || !groupId) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  const categoryNameExists = await prisma.categories.findFirst({
    where: {
      name: name,
    },
  });

  const groupIdExists = await prisma.groups.findFirst({
    where: {
      id: parseInt(groupId),
    },
  });

  if (!groupIdExists) {
    return NextResponse.json({ message: 'Group not found', error: true }, { status: 404 });
  }

  if (categoryNameExists) {
    return NextResponse.json({ message: 'Category already exists', error: true }, { status: 400 });
  }

  const newCategory = await prisma.categories.create({
    data: {
      name,
      group: parseInt(groupId),
    },
  });

  const allowedGroups = await prisma.groups.findMany();

  const category1 = {
    id: newCategory.id,
    name: newCategory.name,
    groups: allowedGroups.filter((group) => group.id <= newCategory.group),
  };

  return NextResponse.json({ message: 'Category created', category: category1, error: false }, { status: 201 });
};
