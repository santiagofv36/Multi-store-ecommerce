'use client';

import { ColumnDef } from '@tanstack/react-table';
import { IBillboard } from '@packages/models';

export const billboardColumns: ColumnDef<IBillboard>[] = [
  {
    header: 'Label',
    accessorKey: 'label',
  },
  {
    header: 'Date',
    accessorKey: 'createdAt',
  },
];
