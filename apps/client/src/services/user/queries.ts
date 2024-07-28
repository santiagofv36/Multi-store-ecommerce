import { api } from '../../lib/api';

export async function getUsers() {
  const { data } = await api.get({
    url: '/user',
  });

  return data;
}
