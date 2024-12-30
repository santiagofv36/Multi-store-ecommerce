import { api } from '@admin/lib/api';
import { IBillboard, TFilterBillboardsInput } from '@packages/models';

export async function getBillboard(params: { _id: string }) {
  if (params._id === 'new') return null;
  const { data } = await api.get<IBillboard>({
    url: `/billboard/${params._id}`,
  });

  return data;
}

export async function getBillboards(filter: TFilterBillboardsInput) {
  const { data } = await api.get<IBillboard[]>({
    url: `/billboard?store=${filter?.store}`,
  });

  return data;
}
