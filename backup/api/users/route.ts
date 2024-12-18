import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

interface User {
  id: number;
  username: string;
  email: string;
  group: string;
  isAdmin: boolean;
  groupId: number;
}

export const GET = async () => {
  const session = await auth();

  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const users = await prisma.users.findMany();
  console.log(users);

  const newUsers: User[] = [];
  const groups = await prisma.groups.findMany();

  users.map((user) => {
    newUsers.push({
      id: user.id,
      username: user?.username || 'Unknown',
      email: user.email || 'Unknown',
      group: groups?.find((group) => group.id === user.group)?.name ?? 'Unknown',
      groupId: user.group ?? 0,
      isAdmin: user.isAdmin,
    });
  });

  return NextResponse.json(newUsers);
};
