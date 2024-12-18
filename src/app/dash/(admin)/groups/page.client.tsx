'use client';

import React, { useState } from 'react';
import { parseAsString, useQueryState } from 'nuqs';
import { Group } from './page';
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash } from 'lucide-react';

const GroupsClient = ({ groups: intialGroups }: { groups: Group[] }) => {
  const [groups, setGroups] = useState<Group[]>(intialGroups);
  const [newName, setNewName] = useState('');
  const [newRoleId, setNewRoleId] = useState('');
  const [search, setSearch] = useQueryState<string>('search', parseAsString.withDefault(''));

  const filteredGroups = groups.filter(
    (group) => group.name.toLowerCase().includes(search.toLowerCase()) || group.roleId.includes(search) || group.id.toString().includes(search),
  );

  const createGroup = async () => {
    try {
      const response = await fetch('/api/group/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newName,
          roleId: newRoleId,
          isAdmin: false,
        }),
      });
      const data = await response.json();
      console.log(data);
      setGroups([...groups, data.group]);
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  const deleteGroup = async (groupId: number) => {
    try {
      const response = await fetch('/api/group/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          groupId,
        }),
      });
      const data = await response.json();
      console.log(data);
      setGroups(groups.filter((group: Group) => group.id !== groupId));
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };

  return (
    <Dialog>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Neue Gruppe Erstellen</DialogTitle>
          <DialogDescription>Gebe die daten deiner neuen Gruppe ein.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-2 py-1">
          <div className="flex flex-col justify-center gap-1">
            <label>Name</label>
            <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Admin" className="col-span-3" />
          </div>
          <div className="flex flex-col justify-center gap-1">
            <label>Rollen ID</label>
            <Input value={newRoleId} onChange={(e) => setNewRoleId(e.target.value)} placeholder="1302366043448279212" className="col-span-3" />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button className="w-full" onClick={async () => await createGroup()}>
              Gruppe Erstellen
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>

      <div className="w-full flex flex-col">
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-bold">Gruppen verwalten</h1>
          <p className="text-zinc-400 leading-4">Hier kannst du alle Gruppen verwalten.</p>
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
            <DialogTrigger asChild>
              <Button size="sm" variant="secondary">
                <Plus /> Neue Gruppe Erstellen
              </Button>
            </DialogTrigger>
          </li>
        </ul>

        <div className="border rounded-lg mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Rollen ID</TableHead>
                <TableHead>ist Admin?</TableHead>
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGroups.map((group: Group, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">#{group.id}</TableCell>
                  <TableCell>{group.name}</TableCell>
                  <TableCell>{group.roleId}</TableCell>
                  <TableCell>{group.isAdmin ? 'Ja' : 'Nein'}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" onClick={async () => await deleteGroup(group.id)} className="hover:bg-red-500/50">
                      <Trash size={12} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Dialog>
  );
};

export default GroupsClient;
