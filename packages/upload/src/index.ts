import { createUploadthing, type FileRouter } from 'uploadthing/express';

const f = createUploadthing();

export const uploadRouter: {
  router: FileRouter;
  config: {
    token: string;
  };
} = {
  router: {
    image: f({
      image: {
        maxFileSize: '4MB',
        maxFileCount: 1,
      },
    }).onUploadComplete((data) => {
      console.log('upload completed', data);
    }),
  },
  config: {
    token: process.env.UPLOADTHING_TOKEN!,
  },
};

export type { FileRouter };

export type OurFileRouter = (typeof uploadRouter)['router'];