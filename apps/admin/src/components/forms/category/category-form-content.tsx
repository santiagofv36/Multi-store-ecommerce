'use client';

import { useFormContext, useWatch } from 'react-hook-form';
import {
  Button,
  Input,
  Label,
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from '../../ui';
import {
  IBillboard,
  TCreateCategoryInput,
  TUpdateCategoryInput,
} from '@packages/models';

interface CategoryFormProps {
  action: string;
  billboards: IBillboard[];
}

export function CategoryFormContent({ action, billboards }: CategoryFormProps) {
  const {
    formState: { errors, isSubmitting },
    register,
    setValue,
    watch,
  } = useFormContext<TUpdateCategoryInput | TCreateCategoryInput>();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="flex flex-col items-start gap-10 col-span-2">
        <div className="flex gap-4 w-full">
          <div className="flex flex-col gap-2 w-full">
            <Label className="text-black text-sm font-semibold">Label</Label>
            <Input
              type="text"
              {...register('name')}
              disabled={isSubmitting}
              placeholder="Category name"
            />
            {errors?.name ? (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            ) : null}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label className="text-black text-sm font-semibold">
              Billboard
            </Label>
            <Select
              disabled={isSubmitting}
              onValueChange={(value) => setValue('billboard', value)}
              value={watch('billboard') as string}
            >
              <SelectTrigger className="w-full border rounded-md">
                <SelectValue placeholder="Select a billboard" />
              </SelectTrigger>
              {billboards && billboards.length > 0 ? (
                <SelectContent className="w-full">
                  {billboards.map((billboard) => (
                    <SelectItem
                      key={billboard._id?.toString() ?? ''}
                      value={billboard._id?.toString() ?? ''}
                      className="w-full"
                    >
                      {billboard.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              ) : (
                <span className="text-gray-500 text-sm">
                  No billboards available
                </span>
              )}
            </Select>
            {errors?.billboard ? (
              <span className="text-red-500 text-sm">
                {errors.billboard.message}
              </span>
            ) : null}
          </div>
        </div>
        <Button className="mr-auto" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : action}
        </Button>
      </div>
    </div>
  );
}
