import { api } from '../../lib/api';
import {
  IStore,
  TCreateStoreInput,
  TFilterStoreInput,
  TFindOneStoreInput,
} from '@packages/models';

export async function createStore(input: TCreateStoreInput) {
  const { data } = await api.post<IStore>({
    url: '/store',
    options: { body: JSON.stringify({ ...input, active: true }) },
  });

  return data;
}

export async function updateStore(input: TFilterStoreInput) {
  const { data } = await api.put<IStore>({
    url: '/store',
    options: { body: JSON.stringify(input) },
  });

  return data;
}

export async function deleteStore(input: TFindOneStoreInput) {
  const { data } = await api.delete<IStore>({
    url: `/store/${input._id}`,
  });

  return data;
}
