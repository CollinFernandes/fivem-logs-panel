import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { adminMiddleware } from '../../middleware';

export const POST = async (req: NextRequest) => {
  const { groupId } = await req.json();

  const middlewareResult = await adminMiddleware(req);
  if (middlewareResult) {
    return middlewareResult;
  }

  if (!groupId) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  const group = await prisma.groups.findUnique({
    where: { id: groupId },
  });

  if (!group) {
    return NextResponse.json({ message: 'Group not found' }, { status: 404 });
  }

  await prisma.groups.delete({
    where: {
      id: groupId,
    },
  });

  return NextResponse.json({ message: 'Group deleted' }, { status: 201 });
};
