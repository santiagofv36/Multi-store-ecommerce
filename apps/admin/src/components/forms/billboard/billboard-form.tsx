'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createBillboardInput,
  IBillboard,
  TCreateBillboardInput,
  TUpdateBillboardInput,
} from '@packages/models';
import { FormProvider, useForm } from 'react-hook-form';
import { BillboardFormContent } from '..';
import { Heading } from '../../shared';
import { Button, Separator } from '../../ui';
import { TrashIcon } from 'lucide-react';
import {
  useCreateBillboard,
  useDeleteBillboard,
  useUpdateBillboard,
} from '@admin/services/billboard';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { AlertModal } from '../../modals';
import { useRouter } from 'next/navigation';

interface BillboardFormProps {
  initialData: IBillboard;
}

export function BillboardForm({ initialData }: BillboardFormProps) {
  const form = useForm<TCreateBillboardInput | TUpdateBillboardInput>({
    resolver: zodResolver(createBillboardInput),
    defaultValues: initialData,
  });

  const queryClient = useQueryClient();
  const updateBillboard = useUpdateBillboard();
  const createBillboard = useCreateBillboard();
  const deleteBillboard = useDeleteBillboard();
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const title = initialData ? 'Edit Billboard' : 'Create Billboard';
  const description = initialData
    ? 'Edit your billboard here'
    : 'Add a new billboard';
  const toastMessage = initialData
    ? 'Billboard updated successfully'
    : 'Billboard created successfully';

  const action = initialData ? 'Save Changes' : 'Create';

  const onSubmit = async (data: TCreateBillboardInput) => {
    try {
      initialData
        ? await updateBillboard.mutateAsync(data) // update the billboard if it exists
        : await createBillboard.mutateAsync(data); // create a new billboard
      toast.success(toastMessage);
      // Invalidate the cache to refetch the data
      queryClient.invalidateQueries({ queryKey: ['getStores'] });
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      // Delete the store
      await deleteBillboard.mutateAsync({ _id: initialData._id });
      // Redirect to the store list

      toast.success('Billboard inactivated successfully');
      queryClient.invalidateQueries({ queryKey: ['getStores'] });
      queryClient.invalidateQueries({ queryKey: ['getStore'] });
      router.refresh();
      router.push('/dashboard');
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
        onClose={() => setOpen((prev) => !prev)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between mb-3">
        <Heading title={title} description={description} />
        {initialData ? (
          <Button
            variant="destructive"
            size="icon"
            onClick={() => setOpen((prev) => !prev)}
          >
            <TrashIcon className="size-4" />
          </Button>
        ) : null}
      </div>
      <Separator />
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <BillboardFormContent action={action} />
        </form>
      </FormProvider>
      <Separator />
    </>
  );
}
