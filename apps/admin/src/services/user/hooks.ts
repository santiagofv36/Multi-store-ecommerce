import { useMutation, useQuery } from '@tanstack/react-query';
import { signUp } from './mutation';
import { getUsers } from './queries';

export function useSignUp() {
  return useMutation({
    mutationKey: ['signUp'],
    mutationFn: signUp,
  });
}

export function useGetUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });
}
