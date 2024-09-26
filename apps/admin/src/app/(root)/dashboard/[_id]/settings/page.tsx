'use client';

import { SettingsForm } from '@admin/components';
import { useStore } from '@admin/services/store';
import { redirect } from 'next/navigation';

interface SettingsPageProps {
  params: {
    _id: string;
  };
}

export default function SettingsPage({ params }: SettingsPageProps) {
  const { data, isLoading } = useStore(params);

  if (!data?.name && !isLoading) {
    redirect('/dashboard');
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {data?.name && !isLoading ? <SettingsForm initialData={data} /> : null}
      </div>
    </div>
  );
}
