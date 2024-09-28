import { api } from '@admin/lib/api';
import { IBillboard } from '@packages/models';

export async function getBillboard(params: { _id: string }) {
  const { data } = await api.get<IBillboard>({
    url: `/billboard/${params._id}`,
  });

  return data;
}
