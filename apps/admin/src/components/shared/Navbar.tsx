import useUser from '@admin/hooks/use-user';
import { MainNav, StoreSwitcher, UserButton } from '.';
import { useStores } from '@admin/services/store';

export function Navbar() {
  const [user] = useUser();

  const { data } = useStores(
    {
      user: user?._id,
    },
    {
      queryKey: ['getStores', `user=${user?._id}`],
      enabled: !!user,
      
    }
  );

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={data} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton user={user} />
        </div>
      </div>
    </nav>
  );
}
