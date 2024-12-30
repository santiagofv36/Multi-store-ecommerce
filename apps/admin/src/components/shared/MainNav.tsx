'use client';

import { cn } from '@admin/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/dashboard/${params._id}`,
      label: 'Overview',
      active: pathname === `/dashboard/${params._id}`,
    },
    {
      href: `/dashboard/${params._id}/billboards`,
      label: 'Billboards',
      active: pathname === `/dashboard/${params._id}/billboards`,
    },
    {
      href: `/dashboard/${params._id}/categories`,
      label: 'Categories',
      active: pathname === `/dashboard/${params._id}/categories`,
    },
    {
      href: `/dashboard/${params._id}/settings`,
      label: 'Settings',
      active: pathname === `/dashboard/${params._id}/settings`,
    },
  ];

  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active
              ? 'text-black dark:text-white'
              : 'text-muted-foreground'
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
