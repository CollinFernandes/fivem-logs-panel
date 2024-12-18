'use client';

import { Input } from '@/components/ui/input';
import { parseAsString, useQueryState } from 'nuqs';
import { User } from './page';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react';

const UsersClient = ({ users }: { users: User[] }) => {
  const [search, setSearch] = useQueryState<string>('search', parseAsString.withDefault(''));

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.id.toString().includes(search),
  );

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col justify-center">
        <h1 className="text-2xl font-bold">Benutzer verwalten</h1>
        <p className="text-zinc-400 leading-4">Hier kannst du alle Benutzer verwalten.</p>
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

        <li className="flex flex-row items-center gap-3"></li>
      </ul>

      <div className="border rounded-lg mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Gruppe</TableHead>
              <TableHead>ist Admin?</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user: User, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium">#{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.group}</TableCell>
                <TableCell>{user.isAdmin ? 'Ja' : 'Nein'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UsersClient;
