import React from 'react';
import { Input, Label, Button } from '../../ui';
import { IStore } from '@packages/models';
import { useFormContext } from 'react-hook-form';

interface StoreFormProps {
  onCancel: () => void;
}

export function StoreFormContent({ onCancel }: StoreFormProps) {
  const {
    register,
    formState: { isValid, errors, isSubmitting },
  } = useFormContext<IStore>();

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-black text-sm font-semibold">Name</Label>
      <Input
        type="text"
        disabled={isSubmitting}
        {...register('name')}
        placeholder="Store name"
      />
      {errors?.name ? (
        <span className="text-red-500 text-sm">{errors.name.message}</span>
      ) : null}
      <div className="flex justify-end space-x-2 mt-2">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={!isValid || isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={!isValid || isSubmitting}>
          Continue
        </Button>
      </div>
    </div>
  );
}
