'use client';

import React from 'react';
import { IBillboard } from '@packages/models';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@admin/components/ui';
import { Copy, Edit, MoreHorizontal, ShieldCheck, Trash } from 'lucide-react';
import toast from 'react-hot-toast';
import { AlertModal } from '../modals';

interface CellActionProps {
  data: IBillboard;
  onEdit: (id: string) => void;
  onDelete: (id: string) => Promise<void>;
  responseText: string;
  onReactivate?: (id: string) => void;
}

export function CellAction({
  data,
  onDelete,
  onEdit,
  responseText,
  onReactivate,
}: CellActionProps) {
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success('Copied to clipboard');
  };
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const confirmDelete = async (id: string) => {
    setLoading(true);
    try {
      await onDelete(id);
      toast.success(responseText);
    } catch (e) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => confirmDelete(data._id as unknown as string)}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {onReactivate ? (
            <DropdownMenuItem
              onClick={() => onReactivate(data._id as unknown as string)}
              className="cursor-pointer"
            >
              <ShieldCheck className="mr-2 size-4" />
              Reactivate
            </DropdownMenuItem>
          ) : (
            <>
              <DropdownMenuItem
                onClick={() => onCopy(data._id as unknown as string)}
                className="cursor-pointer"
              >
                <Copy className="mr-2 size-4" />
                Copy Id
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => onEdit(data._id as unknown as string)}
              >
                <Edit className="mr-2 size-4" />
                Update
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setOpen((prev) => !prev)}
              >
                <Trash className="mr-2 size-4" />
                Delete
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
