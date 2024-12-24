import { generateReactHelpers, generateUploadButton } from '@uploadthing/react';
import { OurFileRouter } from '@packages/upload';

const url = `${process.env.NEXT_PUBLIC_API_URL}/express/upload`;

export const UploadButton = generateUploadButton<OurFileRouter>({
  url,
});

