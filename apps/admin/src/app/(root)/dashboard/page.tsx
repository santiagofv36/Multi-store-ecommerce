'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import useUser from '@admin/hooks/use-user';
import { useStores } from '@admin/services/store';
import { useStoreModal } from '@admin/hooks/use-store-modal';
import { Loader } from '@admin/components';

export default function DashboardPage() {
  const [user] = useUser();
  const { open, isOpen } = useStoreModal();

  const { data, isLoading, isFetched } = useStores(
    {
      user: user?._id,
    },
    {
      queryKey: ['getStores', `user=${user?._id}`],
      enabled: !!user,
    }
  );

  const router = useRouter();

  React.useEffect(() => {
    if (data?.length > 0 && !isLoading && isFetched) {
      router.replace(`/dashboard/${data[0]?._id}`);
      return;
    }

    if (!isLoading && !data?.length && !isOpen && isFetched) {
      open();
    }
  }, [data, isLoading, open, router]);

  return <Loader className="w-16" />;
}
