'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createCategoryInput,
  IBillboard,
  ICategory,
  TCreateCategoryInput,
  TUpdateCategoryInput,
} from '@packages/models';
import { FormProvider, useForm } from 'react-hook-form';
import { Heading } from '../../shared';
import { Button, Separator } from '@admin/components/ui';
import { TrashIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { AlertModal } from '../../modals';
import { useParams, useRouter } from 'next/navigation';
import { Types } from 'mongoose';
import {
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from '@admin/services/categories';
import { CategoryFormContent } from './category-form-content';

interface CategoryFormProps {
  initialData: ICategory;
  billboards: IBillboard[];
}

export function CategoryForm({ initialData, billboards }: CategoryFormProps) {
  const form = useForm<TCreateCategoryInput | TUpdateCategoryInput>({
    resolver: zodResolver(createCategoryInput),
    defaultValues: initialData,
  });

  const { reset } = form;

  const queryClient = useQueryClient();
  const updateCategory = useUpdateCategory();
  const createCategory = useCreateCategory();
  const deleteCategory = useDeleteCategory();
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const params = useParams();

  const title = initialData ? 'Edit Category' : 'Create Category';
  const description = initialData
    ? 'Edit your category here'
    : 'Add a new category';
  const toastMessage = initialData
    ? 'Category updated successfully'
    : 'Category created successfully';

  const action = initialData ? 'Save Changes' : 'Create';

  const onSubmit = async (
    data: TCreateCategoryInput | TUpdateCategoryInput
  ) => {
    try {
      initialData
        ? await updateCategory.mutateAsync({
            ...data,
            _id: initialData._id,
          }) // update the billboard if it exists
        : await createCategory.mutateAsync({
            ...data,
            store: new Types.ObjectId(params?._id as string),
          }); // create a new billboard
      toast.success(toastMessage);
      // Invalidate the cache to refetch the data
      queryClient.invalidateQueries({ queryKey: ['getStores'] });
      router.push(`/dashboard/${params._id}/categories`);
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      // Delete the store
      await deleteCategory.mutateAsync({ _id: initialData._id });
      // Redirect to the store list

      toast.success('Category inactivated successfully');
      queryClient.invalidateQueries({ queryKey: ['getStores'] });
      queryClient.invalidateQueries({ queryKey: ['getStore'] });
      router.refresh();
      router.push(`/dashboard/${params._id}/categories`);
    } catch (e) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  React.useEffect(() => {
    reset({
      ...initialData,
      billboard: (initialData?.billboard as IBillboard)?._id,
    });
  }, [initialData, reset]);

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
          <CategoryFormContent action={action} billboards={billboards} />
        </form>
      </FormProvider>
      <Separator />
    </>
  );
}
