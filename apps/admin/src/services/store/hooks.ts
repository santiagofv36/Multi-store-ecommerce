import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { createStore } from './mutations';
import { getStore, getStores } from './queries';
import { TFilterStoreInput } from 'packages/models/src';

export function useCreateStore() {
  return useMutation({
    mutationKey: ['createStore'],
    mutationFn: createStore,
  });
}

export function useStores(
  params: TFilterStoreInput,
  options?: UseQueryOptions<any, any, any, any>
) {
  return useQuery({
    queryKey: ['getStores', params],
    queryFn: () => getStores(params),
    ...options,
  });
}

export function useStore(params: { _id: string }) {
  return useQuery({
    queryKey: ['getStore'],
    queryFn: () => getStore(params),
  });
}
