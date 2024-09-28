'use client';

import React from 'react';
import { IStore, storeDefinition, TCreateStoreInput } from '@packages/models';
import { useCreateStore } from '@admin/services/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { StoreFormContent } from '..';

interface StoreFormProps {
  close: () => void;
}

export function StoreForm({ close }: StoreFormProps) {
  const createStore = useCreateStore();

  const form = useForm<IStore>({
    resolver: zodResolver(storeDefinition),
    defaultValues: {
      name: '',
    },
  });

  const router = useRouter();
  const queryClient = useQueryClient();

  const onClose = () => {
    close();
    form.reset();
  };

  const onSubmit = async (data: TCreateStoreInput) => {
    try {
      const store = await createStore.mutateAsync(data);
      onClose();
      toast.success('Store created successfully');
      queryClient.invalidateQueries({ queryKey: ['getStores'] });
      router.push(`/dashboard/${store._id}`);
    } catch (error) {
      console.log(error);
      toast.error('Something when wrong');
    } finally {
      form.reset();
      onClose();
    }
  };

  return (
    <div>
      <div className="space-y-4 py-3 pb-4">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <StoreFormContent onCancel={close} />
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
