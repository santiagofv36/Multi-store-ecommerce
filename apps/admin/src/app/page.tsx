'use client';

import Image from 'next/image';
import { useGetUsers, useSignUp } from '../services/user';
import { Button } from '../components/ui/button';

export default function Home() {
  const { data, isLoading } = useGetUsers();

  const signUp = useSignUp();

  const sentData = {
    email: 'Santi@papitas.com',
    password: '12345678',
    name: 'Santiago Jose',
    address: '669fc05eed0be19968f8427a',
    active: true,
  };

  return (
    <div>
      <Button
        onClick={() => {
          // signUp.mutate(sentData);
        }}
      >
        Click me
      </Button>
    </div>
  );
}
