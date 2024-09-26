'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { TAuthSchemaForm, AuthSchema } from '@packages/models';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { SigInFormContent } from '@admin/components';
import toast from 'react-hot-toast';

export function SignInForm() {
  const router = useRouter();
  const [disabled, setDisabled] = React.useState<boolean>(false);

  const form = useForm<TAuthSchemaForm>({
    resolver: zodResolver(AuthSchema),
  });

  const onSubmit = async (data: TAuthSchemaForm) => {
    try {
      setDisabled(true);

      const res = await signIn('credentials', {
        email: data?.email?.toString(),
        password: data?.password?.toString(),
        redirect: false,
        method: 'signIn',
      });

      if (res?.ok) {
        router.replace('/dashboard');
      }

      if (res?.status === 401) {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setDisabled(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <SigInFormContent disabled={disabled} />
      </form>
    </FormProvider>
  );
}
