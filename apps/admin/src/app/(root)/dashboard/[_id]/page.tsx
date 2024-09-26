'use client';

import React from 'react';
import { useStore } from '@admin/services/store';
import { useRouter } from 'next/navigation';

export default function Page({ params }: { params: { _id: string } }) {
  const { data, isLoading } = useStore(params, {
    queryKey: ['getStore', params._id],
  });
  const router = useRouter();

  const validStore = Boolean(data?.name);

  if (!validStore && !isLoading) {
    router.replace('/dashboard');
  }

  // TODO: redirect to 404 page if store is not valid

  return <div>Tienda nombre {data?.name}</div>;
}
