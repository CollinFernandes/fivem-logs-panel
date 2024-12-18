import { prisma } from '@/lib/prisma';
import { Group } from '../groups/page';
import CategoriesClient from './page.client';

export interface Category {
  id: string;
  name: string;
  groups: Group[];
  token: string;
}

const Categories = async () => {
  const groups = await prisma.groups.findMany();
  const categories = await prisma.categories.findMany();
  const allowedGroups = await prisma.groups.findMany();

  const newCategories: Category[] = [];
  categories.forEach((category) => {
    newCategories.push({
      id: category.id,
      name: category.name,
      groups: allowedGroups.filter((group) => group.id <= category.group),
      token: category.token,
    });
  });

  return <CategoriesClient groups={groups} categories={newCategories} />;
};

export default Categories;
