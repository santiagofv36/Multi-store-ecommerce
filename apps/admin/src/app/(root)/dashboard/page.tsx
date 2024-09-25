'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@admin/components';
import useUser from '@admin/hooks/use-user';
import { useStores } from '@admin/services/store';
import { useStoreModal } from '@admin/hooks/use-store-modal';

export default function DashboardPage() {
  const [user] = useUser();
  const { open } = useStoreModal();

  const { data, isLoading } = useStores(
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
    if (data?.length > 0 && !isLoading) {
      router.replace(`/dashboard/${data[0]?._id}`);
      return;
    }

    if (!isLoading && data?.length === 0) {
      open();
    }
  }, [data, isLoading, open, router]);

  return <Button onClick={open}>Open</Button>;
}
