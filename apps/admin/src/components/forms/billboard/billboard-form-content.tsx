import { useFormContext } from 'react-hook-form';
import { Button, Input, Label } from '../../ui';
import { TCreateBillboardInput, TUpdateBillboardInput } from '@packages/models';

interface BillboardFormProps {
  action: string;
}

export function BillboardFormContent({ action }: BillboardFormProps) {
  const {
    formState: { isValid, errors, isSubmitting },
    register,
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
        <Input
          type="text"
          {...register('imageUrl')}
          disabled={isSubmitting}
          placeholder="Billboard image url"
        />
        {errors?.imageUrl ? (
          <span className="text-red-500 text-sm">
            {errors.imageUrl.message}
          </span>
        ) : null}
        <Button
          className="mr-auto"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          {action}
        </Button>
      </div>
    </div>
  );
}
