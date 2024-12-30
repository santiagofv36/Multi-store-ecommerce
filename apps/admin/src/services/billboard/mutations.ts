import { api } from '@admin/lib/api';
import {
  IBillboard,
  TCreateBillboardInput,
  TFilterBillboardsInput,
  TFindOneBillboardInput,
} from '@packages/models';

export async function createBillboard(input: TCreateBillboardInput) {
  const { data } = await api.post<IBillboard>({
    url: '/billboard',
    options: { body: JSON.stringify({ ...input, active: true }) },
  });

  return data;
}
export async function updateBillboard(input: TFilterBillboardsInput) {
  const { data } = await api.put<IBillboard>({
    url: '/billboard',
    options: { body: JSON.stringify(input) },
  });

  return data;
}
export async function deleteBillboard(input: TFindOneBillboardInput) {
  const { data } = await api.delete<IBillboard>({
    url: `/billboard/${input._id}`,
  });

  return data;
}
