'use client';
import React from 'react';
import { Button } from '../ui';
import { cn } from '@admin/lib/utils';
import { signOut } from 'next-auth/react';
import { UserAvatar } from './UserAvatar';
import { IUser } from '@packages/models/src';
import { LogOut } from 'lucide-react';
import useOutsideClick from '@admin/hooks/use-outside-click';
interface UserButtonProps {
  user: IUser | null;
}

export function UserButton({ user }: UserButtonProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  const userAvatarRef = React.useRef<HTMLDivElement>(null);

  useOutsideClick(userAvatarRef, () => {
    setIsVisible(false);
  });

  if (!user) {
    return null;
  }

  return (
    <div className="relative">
      <UserAvatar user={user} onClick={() => setIsVisible(!isVisible)} />
      <div
        className={cn(
          'bg-white p-8 absolute top-12 right-0 border border-gray-200 flex flex-col space-y-4 w-96 rounded-lg shadow-lg justify-start',
          isVisible ? 'block' : 'hidden'
        )}
        ref={userAvatarRef}
      >
        <div className="flex justify-start items-center gap-4">
          <UserAvatar user={user} className="pointer-events-none" />
          <div className="flex flex-col gap-1">
            <span className="font-bold break all">
              {user?.firstName} {user?.lastName}
            </span>
            <span className="text-sm break-all">{user?.email}</span>
          </div>
        </div>
        <div className="flex items-center">
          <Button
            variant="outline"
            className="border-none hover:bg-transparent flex gap-4"
            onClick={() => signOut()}
          >
            <LogOut size={20} className="text-slate-500" />
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
}
