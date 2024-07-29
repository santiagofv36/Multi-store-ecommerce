import { IUser } from '@packages/models';
import { api } from '@admin/lib/api';

export async function currentUser(options?: RequestInit) {
  const { data } = await api.get<IUser>({
    url: '/auth/me',
    options,
  });

  return data;
}
