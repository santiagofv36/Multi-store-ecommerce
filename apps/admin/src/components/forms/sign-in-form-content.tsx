import { TCreatePasswordSchemaForm } from 'packages/models/src';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Input } from '../ui/input';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { Button } from '../ui/button';

interface SignInFormContentProps {
  disabled: boolean;
}

export default function SigInFormContent({ disabled }: SignInFormContentProps) {
  const {
    formState: { isValid, errors },
    register,
  } = useFormContext<TCreatePasswordSchemaForm>();

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  return (
    <Card className="px-4 flex flex-col justify-center items-center bg-gray-100">
      <CardHeader>
        <div className="flex flex-col gap-5 items-center">
          <span>Welcome Back!</span>
          <span>Sign In to access the Admin Panel</span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col space-y-8">
        {/* <label className="text-black/70">Email</label> */}
        <div className="flex items-center gap-4">
          <Mail className="size-6 text-primary/90" />
          <Input
            placeholder="Enter your email"
            type="email"
            disabled={disabled}
            {...register('email')}
          />
          {errors?.email ? (
            <span className="text-red-500">{errors.email.message}</span>
          ) : null}
        </div>
        <div className="flex items-center gap-4">
          <Lock className="size-6 text-primary/90" />
          <Input
            placeholder="Enter your password"
            type={showPassword ? 'text' : 'password'}
            disabled={disabled}
            {...register('password')}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2"
              >
                {showPassword ? (
                  <Eye size={20} className="text-primary/90" />
                ) : (
                  <EyeOff size={20} className="text-primary/90" />
                )}
              </button>
            }
          />
          {errors?.password ? (
            <span className="text-red-500">{errors.password.message}</span>
          ) : null}
        </div>
      </CardContent>
      <CardFooter className="w-full justify-center">
        <Button className="w-full" disabled={!isValid || disabled}>
          Sign In
        </Button>
      </CardFooter>
    </Card>
  );
}
