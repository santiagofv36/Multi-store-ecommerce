import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { IUser } from 'packages/models/src';
import { currentUser } from './queries';

export function useCurrentUser(
  filters?: Partial<IUser>,
  options?: UseQueryOptions<any, any, any, any>
  //<TQueryFnData, TError, TData, TQueryKey>
) {
  return useQuery<IUser>({
    queryKey: ['currentUser'], // query key is an array of strings that uniquely identifies this query
    queryFn: () => currentUser(),
    ...options,
  });
}
