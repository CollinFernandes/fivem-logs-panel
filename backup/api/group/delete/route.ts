import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  const { groupId } = await req.json();
  const session = await auth();

  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  if (!groupId) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  const user = await prisma.users.findFirst({
    where: {
      email: session.user?.email,
    },
    select: {
      isAdmin: true,
    },
  });

  console.log('groupId:', groupId, 'user:', user);

  if (!user?.isAdmin) {
    return new Response('Unauthorized', { status: 401 });
  }

  const group = await prisma.users.findUnique({
    where: { id: groupId },
  });

  if (!group) {
    return NextResponse.json({ message: 'Group not found' }, { status: 404 });
  }

  await prisma.users.delete({
    where: {
      id: groupId,
    },
  });

  return NextResponse.json({ message: 'Group deleted' }, { status: 201 });
};
