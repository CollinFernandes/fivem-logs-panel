import NextAuth from 'next-auth';
import Discord from 'next-auth/providers/discord';
import { prisma } from './lib/prisma';

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    Discord({
      clientId: process.env.AUTH_DISCORD_ID as string,
      clientSecret: process.env.AUTH_DISCORD_SECRET as string,
      authorization: {
        url: 'https://discord.com/api/oauth2/authorize',
        params: {
          scope: 'identify email guilds guilds.members.read',
        },
      },
    }),
  ],
  pages: {
    error: '/login',
    signIn: '/login',
    signOut: '/login',
  },
  callbacks: {
    async session({ session }) {
      const sessionUser = await prisma.users.findFirst({
        where: {
          email: (session.user.email as string) ?? '',
        },
      });
      const userGroup = await prisma.groups.findFirst({
        where: {
          id: sessionUser?.group ?? 1,
        },
      });
      if (session.user) {
        (session.user as { uid?: string }).uid = sessionUser?.id?.toString();
        (session.user as { group?: string }).group = userGroup?.name;
        (session.user as { isAdmin?: boolean }).isAdmin = sessionUser?.isAdmin;
        (session.user as { groupId?: number }).groupId = sessionUser?.group ?? undefined;
        (session.user as { refresh_token?: string }).refresh_token = sessionUser?.refresh_token ?? '';
      }
      return session;
    },
    async signIn({ user, profile, account }) {
      if (!user.email) {
        throw new Error('User email is null or undefined');
      }

      let groupId = 0;
      let isAdmin = false;

      const access_token = account?.access_token as string;
      const response = await fetch('https://discord.com/api/v10/users/@me/guilds/1246218370995720273/member', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user guild information');
      }

      const guildMember = await response.json();

      const groups = await prisma.groups.findMany();
      if (guildMember.roles) {
        const roles = guildMember.roles;
        for (const group of groups) {
          for (const role of roles) {
            if (role === group.roleId) {
              groupId = group.id as number;
              isAdmin = group.isAdmin;
              break;
            }
          }
          if (groupId !== 0) break;
        }
      }

      await prisma.users.upsert({
        where: { email: user.email },
        create: {
          avatar: user.image as string,
          discordId: profile?.id as string,
          email: user.email as string,
          username: profile?.username as string,
          group: groupId,
          isAdmin: isAdmin,
          refresh_token: account?.refresh_token as string,
        },
        update: {
          avatar: user.image as string,
          email: user.email as string,
          username: profile?.username as string,
          group: groupId,
          isAdmin: isAdmin,
          refresh_token: account?.refresh_token as string,
        },
      });

      return groupId !== 0;
    },
    jwt: async ({ user, token, trigger, session }) => {
      if (trigger === 'update') {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },
  },
});
