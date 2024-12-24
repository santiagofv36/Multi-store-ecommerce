import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getBillboard } from './queries';
import { createBillboard, deleteBillboard, updateBillboard } from '.';

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

export function useCreateBillboard() {
  return useMutation({
    mutationKey: ['createBillboard'],
    mutationFn: createBillboard,
  });
}

export function useUpdateBillboard() {
  return useMutation({
    mutationKey: ['updateBillboard'],
    mutationFn: updateBillboard,
  });
}

export function useDeleteBillboard() {
  return useMutation({
    mutationKey: ['deleteBillboard'],
    mutationFn: deleteBillboard,
  });
}
