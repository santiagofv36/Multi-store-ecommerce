'use client';

import { CategoryClient } from '@admin/components/category-client';
import { useStore } from '@admin/services/store';
import { useParams } from 'next/navigation';

export default function CategoriesPage() {
  const params = useParams();

  const { data, isLoading } = useStore({
    _id: params?._id as string,
  });

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={data} isLoading={isLoading} />
      </div>
    </div>
  );
}
