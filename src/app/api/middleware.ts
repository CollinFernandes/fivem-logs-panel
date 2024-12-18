import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export const adminMiddleware = async (request: NextRequest) => {
  const session = await auth();

  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const userEmail = session.user?.email;
  const user = await prisma.users.findFirst({
    where: { email: userEmail },
    select: { isAdmin: true },
  });

  if (!user?.isAdmin) {
    return new Response('Unauthorized', { status: 401 });
  }

  return null;
};
