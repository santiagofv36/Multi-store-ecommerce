import { api } from '../../lib/api';
import { IUser, TCreateUserInput } from '@packages/models';

export function signUp(input: TCreateUserInput) {
  return api.post<{ user: IUser }>({
    url: '/user',
    options: { body: JSON.stringify(input) },
  });
}
