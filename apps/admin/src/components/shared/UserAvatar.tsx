import { IUser } from '@packages/models';
import { Button } from '../ui';
import { cn } from '@admin/lib/utils';

interface UserAvatarProps {
  user: IUser | null;
  onClick?: () => void;
  className?: string;
}

export function UserAvatar({ user, onClick, className }: UserAvatarProps) {
  return (
    <Button
      className={cn(
        'rounded-full size-12 bg-green-600/50 text-lg  hover:bg-green-600/70 group-hover:bg-green-600/70 font-bold',
        className
      )}
      onClick={() => onClick?.()}
    >
      <span className="text-slate-100">{user?.firstName.slice(0, 1)}</span>
      <span className="text-slate-100">{user?.lastName.slice(0, 1)}</span>
    </Button>
  );
}
