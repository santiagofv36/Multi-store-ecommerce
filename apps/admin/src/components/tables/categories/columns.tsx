'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ICategory } from '@packages/models';

export const categoriesColumns: ColumnDef<ICategory>[] = [
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'Billboard',
    accessorKey: 'billboard.label',
  },
  {
    header: 'Date',
    accessorKey: 'createdAt',
  },
];
