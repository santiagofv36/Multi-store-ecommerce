'use client';

import React from 'react';
import { useStoreModal } from '@admin/hooks/use-store-modal';
import { StoreForm, Modal } from '@admin/components';
import { IStore, storeDefinition, TCreateStoreInput } from '@packages/models';
import { useCreateStore } from '@admin/services/store';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

export function StoreModal() {
  const { isOpen, close } = useStoreModal();

  const [disabled, setDisabled] = React.useState<boolean>(false);

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
      setDisabled(true);
      const store = await createStore.mutateAsync(data);
      onClose();
      toast.success('Store created successfully');
      queryClient.invalidateQueries({ queryKey: ['getStores'] });
      router.push(`/dashboard/${store._id}`);
    } catch (error) {
      console.log(error);
      toast.error('Something when wrong');
    } finally {
      setDisabled(false);
    }
  };

  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage productos and categories"
      onClose={close}
      isOpen={isOpen}
    >
      <div>
        <div className="space-y-4 py-3 pb-4">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <StoreForm disabled={disabled} onCancel={close} />
            </form>
          </FormProvider>
        </div>
      </div>
    </Modal>
  );
}
