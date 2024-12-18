import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { adminMiddleware } from '../../middleware';
import { sendToAllClients } from '../../ws/route';

export const POST = async (req: NextRequest) => {
  const { name, groupId } = await req.json();

  const middlewareResult = await adminMiddleware(req);
  if (middlewareResult) {
    return middlewareResult;
  }

  if (!name || !groupId) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  const categoryNameExists = await prisma.categories.findFirst({
    where: {
      name: name.toLowerCase(),
    },
  });

  const groupIdExists = await prisma.groups.findFirst({
    where: {
      id: parseInt(groupId),
    },
  });

  if (!groupIdExists) {
    return NextResponse.json({ message: 'Group not found' }, { status: 404 });
  }

  if (categoryNameExists) {
    return NextResponse.json({ message: 'Category already exists' }, { status: 400 });
  }

  const createdCategory = await prisma.categories.create({
    data: {
      name: name.toLowerCase(),
      group: parseInt(groupId),
      token: generateToken(40),
    },
  });

  const allowedGroups = await prisma.groups.findMany();

  const newCategory = {
    id: createdCategory.id,
    name: createdCategory.name.toLowerCase(),
    groups: allowedGroups.filter((group) => group.id <= createdCategory.group),
  };

  sendToAllClients(
    JSON.stringify({
      event: 'categoryCreated',
      data: {
        id: newCategory.id,
        name: newCategory.name.toLowerCase(),
        group: parseInt(groupId),
      },
    }),
  );

  return NextResponse.json({ message: 'Category created', category: newCategory }, { status: 201 });
};

const generateToken = (length: number): string => {
  const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token: string = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters[randomIndex];
  }

  return token;
};
