'use client';

import React from 'react';
import { useStore } from '@admin/services/store';

export default function Page({ params }: { params: { _id: string } }) {
  const { data } = useStore(params);

  const validStore = Boolean(data?.name);

  // TODO: redirect to 404 page if store is not valid

  return <div>Tienda valida? {validStore.toString()}</div>;
}
