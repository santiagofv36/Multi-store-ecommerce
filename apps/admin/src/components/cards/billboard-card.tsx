'use client';

import { IBillboard } from '@packages/models';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

interface IBillboardCardProps {
  billboard?: IBillboard;
}

export function BillboardCard({ billboard }: IBillboardCardProps) {
  const { push } = useRouter();
  const params = useParams();
  return (
    <div
      className="flex gap-4 cursor-pointer"
      role="button"
      onClick={() =>
        push(`/dashboard/${params._id}/billboards/${billboard?._id}`)
      }
    >
      <Image
        width={100}
        height={100}
        className="object-cover size-40 rounded-md"
        alt={billboard?.label ?? ''}
        src={billboard?.imageUrl ?? ''}
      />

      <h1>{billboard?.label}</h1>
    </div>
  );
}
