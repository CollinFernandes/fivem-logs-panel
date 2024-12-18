import { prisma } from '@/lib/prisma';
import GroupsClient from './page.client';

export interface Group {
  id: number;
  name: string;
  roleId: string;
  isAdmin: boolean;
}

const Groups = async () => {
  const groups = await prisma.groups.findMany();

  return <GroupsClient groups={groups} />;
};

export default Groups;
