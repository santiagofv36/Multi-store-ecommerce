import { useMutation } from '@tanstack/react-query';
import { createStore } from './mutations';

export function useCreateStore() {
  return useMutation({
    mutationKey: ['createStore'],
    mutationFn: createStore,
  });
}
