import { Storage } from '@google-cloud/storage';
import { get } from '@nestled/config/lib/validate';

export const getGoogleStorage = (): Storage => {
  const config = {
    projectId: get(process.env.FIREBASE_PROJECT_ID).asString(),
    keyFilename: 'google-credentials.json',
  };

  return new Storage(config);
};

export const getBucketName = (): string =>
  get(process.env.STORAGE_MEDIA_BUCKET).asString();
