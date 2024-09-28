'use client';

import { PlusIcon } from 'lucide-react';
import { Heading } from './shared';
import { Button, Separator } from './ui';
import { useParams, useRouter } from 'next/navigation';

export function BillboardClient() {
  const count = 0;
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${count})`}
          description="Manage billboards and their content."
        />
        <Button
          onClick={() =>
            router.push(`/dashboard/${params._id}/billboards/new`)
          }
        >
          <PlusIcon className="mr-2 size-4" />
          Add new
        </Button>
      </div>
      <Separator />
    </>
  );
}
