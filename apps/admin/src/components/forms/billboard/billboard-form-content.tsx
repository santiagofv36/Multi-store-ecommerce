'use client';

import { useFormContext } from 'react-hook-form';
import { Button, Input, Label } from '../../ui';
import { TCreateBillboardInput, TUpdateBillboardInput } from '@packages/models';
import { UploadButton } from '@admin/components';
import toast from 'react-hot-toast';
import { BookImage, Trash } from 'lucide-react';
import Image from 'next/image';

interface BillboardFormProps {
  action: string;
}

export function BillboardFormContent({ action }: BillboardFormProps) {
  const {
    formState: { errors, isSubmitting },
    register,
    setValue,
    watch,
  } = useFormContext<TUpdateBillboardInput | TCreateBillboardInput>();

  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="flex flex-col items-start gap-4">
        <Label className="text-black text-sm font-semibold">
          Background Image
        </Label>
        <div className="flex flex-col gap-4 w-full items-start h-full">
          {watch('imageUrl') ? (
            <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
              <div className="z-10 absolute top-2 right-2">
                <Button
                  variant="destructive"
                  onClick={() => {
                    setValue('imageUrl', '');
                  }}
                  type="button"
                  size="icon"
                >
                  <Trash className="size-4" />
                </Button>
              </div>
              <Image
                fill
                className="object-cover"
                alt={watch('label')}
                src={watch('imageUrl')}
              />
            </div>
          ) : null}
          <div className="flex flex-col">
            <UploadButton
              endpoint="image"
              content={{
                allowedContent(arg) {
                  return (
                    <div className="flex flex-col gap-2">
                      <p className="text-xs text-gray-500">
                        Supported formats: jpg, jpeg, png
                      </p>
                    </div>
                  );
                },
                button(arg){
                  return (<div className='flex gap-4'>
                    <BookImage className="size-4" />
                    <p className="text-xs text-white">Upload Image</p>
                  </div>)
                }
              }}
              onClientUploadComplete={(res) => {
                toast.dismiss();
                setValue('imageUrl', res?.[0].url);
                toast.success('Image uploaded successfully');
              }}
              disabled={isSubmitting}
              onUploadBegin={() => toast.loading('Uploading image...')}
              onUploadError={(err) => console.error(err)}
              className="focus:outline-none text-sm"
              appearance={{
                button: {
                  background: '#B7B8C4',
                },
                container: {
                  border: '2px dashed #E5E7EB',
                  borderRadius: '0.375rem',
                  padding: '1rem',
                }
              }}
            />
            {errors?.imageUrl ? (
              <span className="text-red-500 text-sm">
                {errors.imageUrl.message}
              </span>
            ) : null}
          </div>
        </div>
        <Label className="text-black text-sm font-semibold">Label</Label>
        <Input
          type="text"
          {...register('label')}
          disabled={isSubmitting}
          placeholder="Billboard label"
        />
        {errors?.label ? (
          <span className="text-red-500 text-sm">{errors.label.message}</span>
        ) : null}
        <Button className="mr-auto" type="submit" disabled={isSubmitting}>
          {action}
        </Button>
      </div>
    </div>
  );
}
