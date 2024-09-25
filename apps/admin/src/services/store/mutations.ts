import { api } from '../../lib/api';
import { IStore, TCreateStoreInput } from '@packages/models';

export async function createStore(input: TCreateStoreInput) {
  const { data } = await api.post<IStore>({
    url: '/store',
    options: { body: JSON.stringify(input) },
  });

  return data;
}
