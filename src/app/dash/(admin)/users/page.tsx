import { prisma } from '@/lib/prisma';
import UsersClient from './page.client';

export interface User {
  id: number;
  username: string;
  email: string;
  group: string;
  isAdmin: boolean;
}

const Users = async () => {
  const users = await prisma.users.findMany();
  const groups = await prisma.groups.findMany();
  const newUsers: User[] = [];

  users.map((user) => {
    newUsers.push({
      id: user.id,
      username: user?.username || 'Unknown',
      email: user.email || 'Unknown',
      group: groups?.find((group) => group.id === user.group)?.name ?? 'Unknown',
      isAdmin: user.isAdmin,
    });
  });

  return <UsersClient users={newUsers} />;
};

export default Users;
