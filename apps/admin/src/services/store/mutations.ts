import { api } from '../../lib/api';
import { IStore, TCreateStoreInput } from '@packages/models';

export function createStore(input: TCreateStoreInput) {
  return api.post<{ store: IStore }>({
    url: '/store',
    options: { body: JSON.stringify(input) },
  });
}
