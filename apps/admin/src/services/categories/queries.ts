import { api } from '@admin/lib/api';
import { ICategory } from '@packages/models';

export async function getCategory(params: { _id: string }) {
  if (params._id === 'new') return null;
  const { data } = await api.get<ICategory>({
    url: `/category/${params._id}`,
  });

  return data;
}
