import React from 'react';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  const user = await prisma.users.findFirst({
    where: {
      email: session?.user?.email,
    },
    select: {
      isAdmin: true,
    },
  });

  if (!session || !user || !user.isAdmin) {
    redirect('/dash');
  } else {
    return children;
  }
};

export default AdminLayout;
