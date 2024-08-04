import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { IStore } from '@packages/models';
import { useFormContext } from 'react-hook-form';
import { Button } from '../ui/button';

interface StoreFormProps {
  disabled: boolean;
  onCancel: () => void;
}

export default function StoreForm({ disabled, onCancel }: StoreFormProps) {
  const {
    register,
    formState: { isValid, errors },
  } = useFormContext<IStore>();

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-black text-sm font-semibold">Name</Label>
      <Input
        type="text"
        disabled={disabled}
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
          disabled={!isValid || disabled}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={!isValid || disabled}>
          Continue
        </Button>
      </div>
    </div>
  );
}
