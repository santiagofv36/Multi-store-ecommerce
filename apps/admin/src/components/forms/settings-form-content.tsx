import { useFormContext } from 'react-hook-form';
import { Button, Input, Label } from '../ui';
import { TUpdateStoreInput } from '@packages/models';

export function SettingsFormContent() {
  const {
    formState: { isValid, errors, isSubmitting },
    register,
  } = useFormContext<TUpdateStoreInput>();

  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="flex flex-col items-start gap-4">
        <Label className="text-black text-sm font-semibold">Name</Label>
        <Input type="text" {...register('name')} disabled={isSubmitting} />
        {errors?.name ? (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        ) : null}
        <Button
          className="mr-auto"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
