import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { TFindOneBillboardInput } from 'packages/models/src';
import { getBillboard } from './queries';

export function useBillboard(
  params: { _id: string },
  options?: UseQueryOptions<any, any, any, any>
) {
  return useQuery({
    queryKey: ['getBillboard', params],
    queryFn: () => getBillboard(params),
    ...options,
  });
}
