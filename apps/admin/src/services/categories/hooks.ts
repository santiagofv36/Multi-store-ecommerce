import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getCategory } from './queries';
import { createCategory, deleteCategory, updateCategory } from '.';

export function useCategory(
  params: { _id: string },
  options?: UseQueryOptions<any, any, any, any>
) {
  return useQuery({
    queryKey: ['getCategory', params],
    queryFn: () => getCategory(params),
    ...options,
  });
}

export function useCreateCategory() {
  return useMutation({
    mutationKey: ['createCategory'],
    mutationFn: createCategory,
  });
}

export function useUpdateCategory() {
  return useMutation({
    mutationKey: ['updateCategory'],
    mutationFn: updateCategory,
  });
}

export function useDeleteCategory() {
  return useMutation({
    mutationKey: ['deleteCategory'],
    mutationFn: deleteCategory,
  });
}
