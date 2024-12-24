'use client';

import { BillboardClient } from '@admin/components';
import { useStore } from '@admin/services/store';
import { useParams } from 'next/navigation';

export default function BillboardsPage() {
  const params = useParams();

  const { data, isLoading } = useStore({
    _id: params?._id as string,
  });

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={data} isLoading={isLoading} />
      </div>
    </div>
  );
}
