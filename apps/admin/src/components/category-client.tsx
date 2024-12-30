'use client';

import React from 'react';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { Types } from 'mongoose';
import { PlusIcon } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { CellAction, Heading } from './shared';
import { Badge, Button, Separator, Skeleton } from './ui';
import { IBillboard, ICategory, IStore } from '@packages/models';
import { DataTable } from './ui';
import { categoriesColumns } from './tables';
import { ApiList } from '@admin/components/ui/api-list';
import {
  useDeleteCategory,
  useUpdateCategory,
} from '@admin/services/categories';
import { useBillboards } from '@admin/services/billboard';

interface CategoryClientProps {
  data?: IStore;
  isLoading?: boolean;
}

export function CategoryClient({ data, isLoading }: CategoryClientProps) {
  const { push } = useRouter();
  const params = useParams();
  const deleteCategory = useDeleteCategory();
  const updateCategory = useUpdateCategory();
  const queryClient = useQueryClient();

  const count = React.useMemo(() => data?.categories?.length, [data]);

  const categories = React.useMemo(
    () =>
      data?.categories?.map(
        (category) =>
          ({
            ...category,
            createdAt: dayjs((category as ICategory).createdAt).format(
              'MMMM D, YYYY'
            ),
          }) as ICategory
      ) ?? [],
    [data]
  );

  const onEdit = (_id: string) => {
    push(`/dashboard/${params._id}/categories/${_id}`);
  };

  const onDelete = async (_id: string) => {
    try {
      // Delete the store
      await deleteCategory.mutateAsync({ _id: new Types.ObjectId(_id) });
      // Redirect to the store list
      toast.success('Category inactivated successfully');
      push(`/dashboard/${params._id}/categories`);
      queryClient.invalidateQueries({ queryKey: ['getStores'] });
      queryClient.invalidateQueries({ queryKey: ['getStore'] });
    } catch (e) {
      toast.error('Something went wrong');
    }
  };

  const onReactivate = async (_id: string) => {
    try {
      // Reactivate the store
      await updateCategory.mutateAsync({
        _id: new Types.ObjectId(_id),
        active: true,
      });
      // Redirect to the store list
      toast.success('Category reactivated successfully');
      queryClient.invalidateQueries({ queryKey: ['getStores'] });
      queryClient.invalidateQueries({ queryKey: ['getStore'] });
    } catch (e) {
      toast.error('Something went wrong');
    }
  };

  const columns: ColumnDef<ICategory>[] = React.useMemo(() => {
    return [
      ...categoriesColumns,
      {
        id: 'active',
        header: 'Status',
        cell: ({ row }: { row: any }) => (
          <Badge variant={row.original.active ? 'active' : 'inactive'}>
            {row.original.active ? 'Active' : 'Inactive'}
          </Badge>
        ),
      },
      {
        id: 'actions',
        cell: ({ row }: { row: any }) => (
          <CellAction
            data={row.original}
            onEdit={onEdit}
            onDelete={onDelete}
            responseText="Category inactivated successfully"
            onReactivate={row.original.active ? undefined : onReactivate}
          />
        ),
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriesColumns]);

  const { data: billboards, isLoading: billboardLoading } = useBillboards(
    {
      store: new Types.ObjectId(params._id as string),
    },
    {
      queryKey: ['getBillboard', params],
      enabled: !!params._id,
    }
  );

  const isDisabled = React.useMemo(
    () =>
      !billboardLoading &&
      (billboards as unknown as IBillboard[])?.length === 0,
    [billboardLoading, billboards]
  );

  const onAdd = () => {
    if (isDisabled) {
      toast.error('Please create a billboard first');
      return;
    }
    push(`/dashboard/${params._id}/categories/new`);
  };

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
            title={`Categories (${count})`}
            description="Manage categories and their content."
          />
          <Button onClick={onAdd}>
            <PlusIcon className="mr-2 size-4" />
            Add new
          </Button>
        </div>
      )}
      <Separator />
      <DataTable columns={columns} data={categories} searchKey="name" />
      <Heading title="API" description="API Calls for Categories" />
      <Separator />
      <ApiList
        entityName="category"
        entityNameId="categoryId"
        queryParam={`store=${params._id}`}
      />
    </>
  );
}
