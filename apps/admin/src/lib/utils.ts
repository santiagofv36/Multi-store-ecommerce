import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const entityRoutes = [
  'store',
  'billboard',
  'user',
  'billboards',
] as const;

export type EntityRoute = (typeof entityRoutes)[number];

export function constructUrl(
  baseUrl: string,
  entity: EntityRoute,
  id: string | string[],
  prefix: string = '',
  queryParam: string = ''
) {
  switch (entity) {
    case 'billboard':
      return `${baseUrl}${prefix ? `/${prefix}/${id}` : `/${entity}/${id}`}${queryParam ? `?${queryParam}` : ''}`;
    default:
      return '';
  }
}
