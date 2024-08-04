'use client';

import React from 'react';
import { useStoreModal } from '@admin/hooks/use-store-modeal';
import Modal from '@admin/components/ui/modal';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { IStore, storeDefinition, TCreateStoreInput } from '@packages/models';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import StoreForm from '../forms/store-form';
import { useCreateStore } from '@admin/services/store';

export default function DashboardPage() {
  const { isOpen, close } = useStoreModal();

  const [disabled, setDisabled] = React.useState<boolean>(false);

  const createStore = useCreateStore();

  const form = useForm<IStore>({
    resolver: zodResolver(storeDefinition),
    defaultValues: {
      name: '',
    },
  });

  const onClose = () => {
    close();
    form.reset();
  };

  const onSubmit = async (data: TCreateStoreInput) => {
    try {
      setDisabled(true);
      await createStore.mutateAsync(data);
      onClose();
    } catch (error) {
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
