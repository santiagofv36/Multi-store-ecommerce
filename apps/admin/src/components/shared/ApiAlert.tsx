'use client';

import React from 'react';
import { Copy, Eye, EyeOff, Server } from 'lucide-react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  BadgeProps,
  Button,
} from '../ui';
import toast from 'react-hot-toast';

interface ApiAlertProps {
  title: string;
  description: string;
  variant: 'public' | 'admin';
  hidden?: boolean;
}

const textMap: Record<ApiAlertProps['variant'], string> = {
  public: 'Public',
  admin: 'Admin',
};

const variantMap: Record<ApiAlertProps['variant'], BadgeProps['variant']> = {
  public: 'secondary',
  admin: 'destructive',
};

export function ApiAlert({
  title,
  description,
  variant = 'public',
  hidden = false,
}: ApiAlertProps) {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success('Copied to clipboard');
  };

  const [visible, setVisible] = React.useState(false);

  return (
    <Alert>
      <Server className="size-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold flex items-center gap-2">
          {hidden ? (
            <span className="flex line-clamp-1 w-96">
              {visible ? description : '********'}
            </span>
          ) : (
            <span>{description}</span>
          )}
          {hidden ? (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setVisible(!visible)}
            >
              {visible ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </Button>
          ) : null}
        </code>
        <Button variant="outline" size="icon" onClick={onCopy}>
          <Copy className="size-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
}
