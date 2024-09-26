import { TCreatePasswordSchemaForm } from 'packages/models/src';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';

interface SignInFormContentProps {
  disabled: boolean;
}

export function SigInFormContent({ disabled }: SignInFormContentProps) {
  const {
    formState: { isValid, errors },
    register,
  } = useFormContext<TCreatePasswordSchemaForm>();

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  return (
    <Card className="bg-gray-100 w-[400px]">
      <CardHeader className="items-center">
        <CardTitle className="font-semibold text-primary/90">
          Sign in to Store
        </CardTitle>
        <CardDescription className="text-black/70">
          Welcome back! Sign in to continue
        </CardDescription>
        <Separator  />
      </CardHeader>
      <CardContent className="flex flex-col space-y-2">
        <Label className="text-black/70 text-sm font-semibold">
          Email address
        </Label>
        <div className="flex items-center gap-4">
          <Input
            type="email"
            disabled={disabled}
            {...register('email')}
          />
          {errors?.email ? (
            <span className="text-red-500">{errors.email.message}</span>
          ) : null}
        </div>
        <Label className="text-black/70 text-sm font-semibold">Password</Label>
        <div className="flex items-center gap-4 pb-5">
          <Input
            type={showPassword ? 'text' : 'password'}
            disabled={disabled}
            {...register('password')}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-3"
              >
                {showPassword ? (
                  <Eye size={16} className="text-primary/90" />
                ) : (
                  <EyeOff size={16} className="text-primary/90" />
                )}
              </button>
            }
          />
          {errors?.password ? (
            <span className="text-red-500">{errors.password.message}</span>
          ) : null}
        </div>
        <Button disabled={!isValid || disabled}>
          Sign In
        </Button>
      </CardContent>
      {/* <CardFooter className="w-full justify-center"></CardFooter> */}
      {/* Add sign un btn */}
    </Card>
  );
}
