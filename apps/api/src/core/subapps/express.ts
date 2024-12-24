import {
  createRouteHandler,
  createUploadthing,
  FileRouter,
} from 'uploadthing/express';
import express from 'express';
import { config } from 'dotenv';

config();

const f = createUploadthing();

const uploadRouter = createRouteHandler({
  router: {
    image: f({
      image: {
        maxFileCount: 1,
        maxFileSize: '4MB',
      },
    }).onUploadComplete((data) => {
      console.log('upload completed', data);
    }),
  } satisfies FileRouter,
  config: {
    token: process.env.UPLOADTHING_TOKEN!,
    callbackUrl: process.env.CLIENT_URL!,
  },
});

const app: express.Application = express();

app.use('/upload', uploadRouter);

export { app };
