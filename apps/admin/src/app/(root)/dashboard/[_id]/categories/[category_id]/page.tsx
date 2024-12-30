'use client';

import React from 'react';
import toast from 'react-hot-toast';
import { Types } from 'mongoose';
import { useRouter } from 'next/navigation';
import { CategoryForm } from '@admin/components/forms/category/category-form';
import { useBillboards } from '@admin/services/billboard';
import { useCategory } from '@admin/services/categories';
 


export default function CategoryPage({
  params,
}: {
  params: { category_id: string; _id: string };
}) {
  const { data } = useCategory(
    {
      _id: params.category_id,
    },
    {
      queryKey: ['getCategory', params],
      enabled: !!params.category_id,
    }
  );
  const { replace } = useRouter();

  const { data: billboards, isLoading } = useBillboards(
    {
      store: new Types.ObjectId(params._id),
    },
    {
      queryKey: ['getBillboard', params],
      enabled: !!params._id,
    }
  );

  React.useEffect(() => {
    if (!isLoading && billboards?.length === 0) {
      replace(`/dashboard/${params._id}/billboards/new`);
      toast.error(
        'No billboards found for this store, please create one in order to create a category'
      );
    }
  }, [isLoading, billboards, params._id, replace]);

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={data} billboards={billboards} />
      </div>
    </div>
  );
}
