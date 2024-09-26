'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { IStore, TUpdateStoreInput, updateStoreInput } from '@packages/models';
import { FormProvider, useForm } from 'react-hook-form';
import { SettingsFormContent } from '.';
import { Heading } from '../shared';
import { Button, Separator } from '../ui';
import { TrashIcon } from 'lucide-react';
import { useDeleteStore, useUpdateStore } from '@admin/services/store';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { AlertModal } from '../modals';
import { useParams, useRouter } from 'next/navigation';
import { ApiAlert } from '../shared/ApiAlert';

interface SettingsFormProps {
  initialData: IStore;
}

export function SettingsForm({ initialData }: SettingsFormProps) {
  const form = useForm<TUpdateStoreInput>({
    resolver: zodResolver(updateStoreInput),
    defaultValues: initialData,
  });

  const params = useParams();

  const queryClient = useQueryClient();
  const updateStore = useUpdateStore();
  const deleteStore = useDeleteStore();
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const onSubmit = async (data: TUpdateStoreInput) => {
    try {
      await updateStore.mutateAsync(data);
      toast.success('Store updated successfully');
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
      await deleteStore.mutateAsync({ _id: initialData._id });
      // Redirect to the store list

      toast.success('Store inactivated successfully');
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
        <Heading
          title="Settings"
          description="Manage your store settings here."
        />
        <Button
          variant="destructive"
          size="icon"
          onClick={() => setOpen((prev) => !prev)}
        >
          <TrashIcon className="size-4" />
        </Button>
      </div>
      <Separator />
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <SettingsFormContent />
        </form>
      </FormProvider>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${process.env.NEXT_PUBLIC_API_URL}/stores/${params._id}`}
        variant="public"
      />
    </>
  );
}
