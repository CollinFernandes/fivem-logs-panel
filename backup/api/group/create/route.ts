import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  const { name, roleId, isAdmin } = await req.json();
  const session = await auth();

  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  if (!name || !roleId) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  const groupExisting = await prisma.groups.findFirst({
    where: {
      name,
    },
  });

  const roleIdExisting = await prisma.groups.findFirst({
    where: {
      roleId,
    },
  });
  if (groupExisting) {
    return NextResponse.json({ message: 'Group already exists' }, { status: 400 });
  }

  if (roleIdExisting) {
    return NextResponse.json({ message: 'Role ID already exists' }, { status: 400 });
  }

  let shouldBeAdmin = isAdmin;
  if (!isAdmin) {
    shouldBeAdmin = false;
  }

  const group = await prisma.groups.create({
    data: {
      name,
      roleId,
      isAdmin: shouldBeAdmin,
    },
  });

  console.log(group);

  return NextResponse.json({ message: 'Group created', group: group }, { status: 201 });
};
