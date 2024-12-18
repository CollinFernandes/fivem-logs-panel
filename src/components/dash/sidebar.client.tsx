'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useWebSocket } from 'next-ws/client';
import { Group, Home, LucideIcon, Package, Users } from 'lucide-react';
import CategorySection from './category-section';
import Link from 'next/link';

interface NavCategory {
  label: string;
  items: NavItem[];
  needsAdmin?: boolean;
}

interface NavItem {
  path: string;
  name: string;
  icon: LucideIcon;
}

interface LogCategory {
  id: number;
  name: string;
}

const navCategories: NavCategory[] = [
  {
    label: 'Start Bereich',
    needsAdmin: false,
    items: [{ path: '/dash', name: 'Startseite', icon: Home }],
  },
  {
    label: 'Admin Bereich',
    needsAdmin: true,
    items: [
      { path: '/dash/users', name: 'Benutzer verwalten', icon: Users },
      { path: '/dash/groups', name: 'Gruppen verwalten', icon: Group },
      { path: '/dash/categories', name: 'Kategorien verwalten', icon: Package },
    ],
  },
];

const SidebarClient = ({
  groupId,
  isAdmin: intialIsAdmin,
  logCategories: intialLogCategories,
}: {
  groupId: number;
  isAdmin: boolean;
  logCategories: LogCategory[];
}) => {
  const pathname: string = usePathname();
  const ws = useWebSocket();

  const [isAdmin, setIsAdmin] = useState<boolean>(intialIsAdmin);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'Start Bereich': true,
    'Admin Bereich': true,
    'Logs Bereich': pathname.startsWith('/dash/logs'),
  });
  const [logCategories, setLogCategories] = useState<LogCategory[]>(intialLogCategories);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const capitalize = (s: string) => {
    return String(s[0]).toUpperCase() + String(s).slice(1);
  };

  useEffect(() => {
    const onMessage = async (event: MessageEvent) => {
      const payload = typeof event.data === 'string' ? event.data : await event.data.text();
      const message = JSON.parse(payload);

      if (message.event === 'categoryCreated') {
        console.log(groupId, message.data.group);
        if (groupId > message.data.group) {
          return;
        }
        setLogCategories((prev) => [...prev, message.data]);
      } else if (message.event === 'categoryDeleted') {
        setLogCategories((prev) => prev.filter((category) => category.id !== message.data.categoryId));
      }
    };

    ws?.addEventListener('message', onMessage);

    return () => ws?.removeEventListener('message', onMessage);
  }, [ws]);

  useEffect(() => {
    setExpandedCategories({
      ...expandedCategories,
      'Logs Bereich': pathname.startsWith('/dash/logs'),
    });
  }, [pathname]);

  return (
    <aside className="fixed top-0 left-0 w-80 min-h-screen bg-background border-r p-4 overflow-y-auto z-[25]">
      <div className="w-full min-h-screen flex flex-col items-center">
        <Link href="/dash" className="w-full border-b pb-4 mb-2 flex items-center justify-center">
          <img src="https://cdn.zzfxnn.wtf/_masora/logos/animated.gif" alt="Masora Logo" className="w-14 h-14" />
          <div className="ml-3">
            <p className="text-xl font-bold text-blue-500">
              MASORA <span className="text-orange-500">ROLEPLAY</span>
            </p>
            <p className="text-zinc-300 leading-4 italic">LOGS SYSTEM</p>
          </div>
        </Link>

        {navCategories.map(
          (category) =>
            (!category.needsAdmin || (category.needsAdmin && isAdmin)) && (
              <CategorySection
                key={category.label}
                label={category.label}
                items={category.items}
                isExpanded={expandedCategories[category.label]}
                toggle={() => toggleCategory(category.label)}
                currentPath={pathname}
              />
            )
        )}

        <CategorySection
          label="Logs Bereich"
          items={logCategories.map(({ id, name }) => ({ path: `/dash/logs/${id}`, name: capitalize(name), icon: Package }))}
          isExpanded={expandedCategories['Logs Bereich']}
          toggle={() => toggleCategory('Logs Bereich')}
          currentPath={pathname}
        />
      </div>
    </aside>
  );
};

export default SidebarClient;
