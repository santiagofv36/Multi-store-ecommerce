import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { createStore, deleteStore, updateStore } from './mutations';
import { getStore, getStores } from './queries';
import { IStore, TFilterStoreInput, TUpdateStoreInput } from '@packages/models';

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

export function useStore(
  params: { _id: string },
  options?: UseQueryOptions<any, any, any, any>
) {
  return useQuery<IStore>({
    queryKey: ['getStore'],
    queryFn: () => getStore(params),
    ...options,
  });
}

export function useUpdateStore() {
  return useMutation({
    mutationKey: ['updateStore'],
    mutationFn: updateStore,
  });
}

export function useDeleteStore() {
  return useMutation({
    mutationKey: ['deleteStore'],
    mutationFn: deleteStore,
  });
}
