'use client';

import { BillboardForm } from '@admin/components';
import { useBillboard } from '@admin/services/billboard';

export default function BillboardPage({
  params,
}: {
  params: { billboard_id: string };
}) {
  const { data } = useBillboard(
    {
      _id: params.billboard_id,
    },
    {
      queryKey: ['getBillboard', params],
      enabled: !!params.billboard_id,
    }
  );

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={data} />
      </div>
    </div>
  );
}
