import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { adminMiddleware } from '../../middleware';

export const POST = async (req: NextRequest) => {
  const { name, roleId, isAdmin } = await req.json();

  const middlewareResult = await adminMiddleware(req);
  if (middlewareResult) {
    return middlewareResult;
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

  return NextResponse.json({ message: 'Group created', group: group }, { status: 201 });
};
