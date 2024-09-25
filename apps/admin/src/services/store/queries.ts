import { api } from '@admin/lib/api';
import { IStore, TFilterStoreInput } from '@packages/models';

export async function getStores(params: TFilterStoreInput) {
  const { data } = await api.get<IStore[]>({
    url: `/store?user=${params?.user}`,
  });

  return data;
}

export async function getStore(params: { _id: string }) {
  const { data } = await api.get<IStore>({
    url: `/store/${params._id}`,
  });

  return data;
}
