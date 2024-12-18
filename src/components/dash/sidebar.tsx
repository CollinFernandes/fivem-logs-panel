import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import SidebarClient from './sidebar.client';

const Sidebar = async () => {
  const session = await auth();

  const user = await prisma.users.findFirst({
    where: {
      email: session?.user?.email,
    },
  });

  const group = await prisma.groups.findFirst({
    where: {
      id: user?.group ?? 1,
    },
    select: {
      id: true,
    },
  });

  const categories = await prisma.categories.findMany();
  const allowedCategories: any = categories.filter((category) => category.group >= (user?.group ?? 0));

  return <SidebarClient groupId={group?.id ?? 0} isAdmin={user?.isAdmin ?? false} logCategories={allowedCategories} />;
};

export default Sidebar;
