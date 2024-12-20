'use client';

import React from 'react';
import { CellAction, Heading } from './shared';
import { Button, Separator, Skeleton } from './ui';
import { useParams, useRouter } from 'next/navigation';
import { IBillboard, IStore } from '@packages/models';
import { PlusIcon } from 'lucide-react';
import { DataTable } from './ui';
import { billboardColumns } from './tables';
import dayjs from 'dayjs';
import { ColumnDef } from '@tanstack/react-table';
import { useDeleteBillboard } from '@admin/services/billboard';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { Types } from 'mongoose';

interface BillboardClientProps {
  data?: IStore;
  isLoading?: boolean;
}

export function BillboardClient({ data, isLoading }: BillboardClientProps) {
  const { push } = useRouter();
  const params = useParams();
  const deleteBillboard = useDeleteBillboard();
  const queryClient = useQueryClient();

  const count = React.useMemo(() => data?.billboards?.length, [data]);

  const billboards = React.useMemo(
    () =>
      data?.billboards?.map(
        (billboard) =>
          ({
            ...billboard,
            createdAt: dayjs((billboard as IBillboard).createdAt).format(
              'MMMM D, YYYY'
            ),
          }) as IBillboard
      ) ?? [],
    [data]
  );

  const onEdit = (_id: string) => {
    push(`/dashboard/${params._id}/billboards/${_id}`);
  };

  const onDelete = async (_id: string) => {
    try {
      // Delete the store
      await deleteBillboard.mutateAsync({ _id: new Types.ObjectId(_id) });
      // Redirect to the store list
      toast.success('Billboard inactivated successfully');
      push(`/dashboard/${params._id}/billboards`);
      queryClient.invalidateQueries({ queryKey: ['getStores'] });
      queryClient.invalidateQueries({ queryKey: ['getStore'] });
    } catch (e) {
      toast.error('Something went wrong');
    }
  };

  const columns: ColumnDef<IBillboard>[] = React.useMemo(() => {
    return [
      ...billboardColumns,
      {
        id: 'actions',
        cell: ({ row }: { row: any }) => (
          <CellAction
            data={row.original}
            onEdit={onEdit}
            onDelete={onDelete}
            responseText='Billboard inactivated successfully'
          />
        ),
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billboardColumns]);

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
            onClick={() => push(`/dashboard/${params._id}/billboards/new`)}
          >
            <PlusIcon className="mr-2 size-4" />
            Add new
          </Button>
        </div>
      )}
      <Separator />
      <DataTable columns={columns} data={billboards} searchKey="label" />
    </>
  );
}
