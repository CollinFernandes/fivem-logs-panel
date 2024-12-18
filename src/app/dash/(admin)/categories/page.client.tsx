'use client';

import React, { useState } from 'react';
import { parseAsString, useQueryState } from 'nuqs';
import { Group } from '../groups/page';
import { Category } from './page';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Key, LinkIcon, Plus, Trash } from 'lucide-react';
import Link from 'next/link';

const CategoriesClient = ({ groups: intialGroups, categories: intialCategories }: { groups: Group[]; categories: Category[] }) => {
  const [groups, setGroups] = useState<Group[]>(intialGroups);
  const [categories, setCategories] = useState<Category[]>(intialCategories);
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [search, setSearch] = useQueryState<string>('search', parseAsString.withDefault(''));

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(search.toLowerCase()) ||
      category.groups.some((group) => group.name.toLowerCase().includes(search.toLowerCase())),
  );

  const createCategory = async () => {
    try {
      const response = await fetch('/api/category/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: selectedCategory,
          groupId: selectedGroup,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.status !== 201) {
        console.log('Error creating category:', data.message);
        return;
      }
      console.log(data.category);
      setCategories([...categories, data.category]);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteCategory = async (categoryId: string) => {
    try {
      const response = await fetch('/api/category/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categoryId,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.status !== 201) {
        console.log('Error deleting category:', data.message);
        return;
      }
      setCategories(categories.filter((category) => category.id !== categoryId));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col justify-center">
        <h1 className="text-2xl font-bold">Kategorien verwalten</h1>
        <p className="text-zinc-400 leading-4">Hier kannst du alle Kategorien verwalten.</p>
      </div>

      <ul className="w-full mt-4 flex flex-row items-center justify-between">
        <li className="flex flex-row items-center">
          <Input
            placeholder="Suchen..."
            value={search}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)}
            className="w-72"
          />
        </li>

        <li className="flex flex-row items-center gap-3">
          <Dialog>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Neue Kategorie Erstellen</DialogTitle>
                <DialogDescription>Gebe die daten deiner neuen Kategorie ein.</DialogDescription>
              </DialogHeader>

              <div className="grid gap-2 py-1">
                <div className="flex flex-col justify-center gap-1">
                  <label>Name</label>
                  <Input value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} placeholder="Revive" className="col-span-3" />
                </div>
                <div className="flex flex-col justify-center gap-1">
                  <label>Benötigte Gruppe</label>
                  <Select onValueChange={(value) => setSelectedGroup(value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Auswählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {groups.map((group: Group, index: number) => (
                        <SelectItem key={index} value={group.id.toString()}>
                          {group.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button className="w-full" onClick={createCategory}>
                    Speichern
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>

            <DialogTrigger asChild>
              <Button size="sm" variant="secondary">
                <Plus /> Neue Kategorie Erstellen
              </Button>
            </DialogTrigger>
          </Dialog>
        </li>
      </ul>

      <div className="border rounded-lg mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Gruppe</TableHead>
              <TableHead className="text-right">Aktionen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.map((category: Category, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.groups.map((group) => group.name).join(', ')}</TableCell>
                <TableCell className="text-right flex gap-1 justify-end">
                  <Dialog>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Kategorie Secret Token</DialogTitle>
                        <DialogDescription>Hier siehst du den API Secret Token der Kategorie.</DialogDescription>
                      </DialogHeader>

                      <div className="grid gap-2 py-1">
                        <div className="flex flex-col justify-center gap-1">
                          <label>Name</label>
                          <Input
                            value={category.token}
                            disabled
                            className="col-span-3 blur-[3px] active:blur-none transition"
                            style={{ opacity: '1' }}
                          />
                        </div>
                      </div>

                      <DialogFooter>
                        <DialogClose asChild>
                          <Button className="w-full" onClick={() => navigator.clipboard.writeText(category.token)}>
                            Key Kopieren
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>

                    <DialogTrigger asChild>
                      <Button variant="ghost">
                        <Key size={12} />
                      </Button>
                    </DialogTrigger>
                  </Dialog>

                  <Link href={`/dash/logs/${category.id}`}>
                    <Button variant="ghost">
                      <LinkIcon size={12} />
                    </Button>
                  </Link>

                  <Button variant="ghost" onClick={async () => await deleteCategory(category.id)} className="hover:bg-red-500/50">
                    <Trash size={12} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CategoriesClient;
