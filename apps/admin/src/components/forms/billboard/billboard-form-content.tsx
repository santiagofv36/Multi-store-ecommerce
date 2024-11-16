'use client';

import { useFormContext } from 'react-hook-form';
import { Button, Input, Label } from '../../ui';
import { TCreateBillboardInput, TUpdateBillboardInput } from '@packages/models';
import { UploadButton } from '@admin/components';
import toast from 'react-hot-toast';
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
        <Label className="text-black text-sm font-semibold">Image Url</Label>
        <div className="flex gap-4 w-full items-center h-full">
          {watch('imageUrl') ? (
            <div className="relative">
              <Button
                className="absolute p-0 size-6 rounded-full bottom-12 left-10"
                variant="destructive"
                onClick={() => setValue('imageUrl', '')}
              >
                <span className="text-xs">X</span>
              </Button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={watch('imageUrl')}
                alt="Billboard Image"
                loading="lazy"
                className="rounded-full w-32 h-16"
              />
            </div>
          ) : null}
          <div className="flex flex-col">
            <UploadButton
              endpoint="image"
              onClientUploadComplete={(res) => {
                toast.dismiss();
                setValue('imageUrl', res?.[0].url);
                toast.success('Image uploaded successfully');
              }}
              disabled={isSubmitting}
              onUploadBegin={() => toast.loading('Uploading image...')}
              onUploadError={(err) => console.error(err)}
              className='focus:outline-none'
            />
            {errors?.imageUrl ? (
              <span className="text-red-500 text-sm">
                {errors.imageUrl.message}
              </span>
            ) : null}
          </div>
        </div>
        <Button
          className="mr-auto"
          type="submit"
          disabled={isSubmitting}
        >
          {action}
        </Button>
      </div>
    </div>
  );
}
