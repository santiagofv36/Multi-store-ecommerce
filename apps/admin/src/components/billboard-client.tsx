'use client';

import React from 'react';
import { Heading } from './shared';
import { Button, Separator, Skeleton } from './ui';
import { useParams, useRouter } from 'next/navigation';
import { useStore } from '@admin/services/store';
import { BillboardCard } from './cards/billboard-card';
import { IBillboard } from '@packages/models';
import { PlusIcon } from 'lucide-react';

export function BillboardClient() {
  const router = useRouter();
  const params = useParams();

  const { data, isLoading } = useStore({
    _id: params?._id as string,
  });

  const count = React.useMemo(() => data?.billboards?.length, [data]);

  const billboards = React.useMemo(
    () => (data?.billboards as IBillboard[]) ?? [],
    [data]
  );
  return (
    <>
      {isLoading ? (
        <Skeleton className="w-full bg-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-64 h-8 bg-gray-200 rounded-full"></div>
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              </div>
            </div>
            <div className="w-24 h-8 bg-gray-200 rounded-md" />
          </div>
        </Skeleton>
      ) : (
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
      )}
      <Separator />
      {count === 0 ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">No billboards found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-8">
          {isLoading
            ? // Improve this skeleton loader
              Array.from({ length: 6 }).map((_, idx) => (
                <Skeleton key={idx} className="bg-transparent">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                        <div className="w-64 h-8 bg-gray-200 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </Skeleton>
              ))
            : billboards.map((billboard: IBillboard, idx) => (
                <BillboardCard
                  key={billboard?._id?.toString() ?? idx}
                  billboard={billboard}
                />
              ))}
        </div>
      )}
    </>
  );
}
