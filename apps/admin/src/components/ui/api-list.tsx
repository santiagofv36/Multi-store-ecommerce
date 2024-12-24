'use client';

import { useParams } from 'next/navigation';
import { ApiAlert } from '../shared';
import { constructUrl, EntityRoute } from '@admin/lib/utils';
import useUser from '@admin/hooks/use-user';

interface ApiListProps {
  entityName: EntityRoute;
  entityNameId: string;
  queryParam: string;
}

export function ApiList({
  entityName,
  entityNameId,
  queryParam,
}: ApiListProps) {
  const params = useParams();
  const [user] = useUser();

  const authToken = user?.activeSession?.token;

  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;

  return (
    <>
      <ApiAlert
        title="Token"
        description={`Bearer ${authToken}`}
        variant="admin"
        hidden
      />
      <ApiAlert
        title="GET"
        variant="admin"
        description={constructUrl(baseUrl, entityName, '', '', queryParam)}
      />
      <ApiAlert
        title="GET"
        description={constructUrl(baseUrl, entityName, params._id ?? '')}
        variant="admin"
      />
      <ApiAlert
        title="POST"
        variant="admin"
        description={constructUrl(baseUrl, entityName, '')}
      />
      <ApiAlert
        title="PATCH"
        variant="admin"
        description={constructUrl(baseUrl, entityName, '')}
      />
      <ApiAlert
        title="DELETE"
        variant="admin"
        description={constructUrl(baseUrl, entityName, `{${entityNameId}}`)}
      />
    </>
  );
}
