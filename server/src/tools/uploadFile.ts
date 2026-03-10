import { createWriteStream, mkdirSync } from 'fs';
import { FileUpload } from 'graphql-upload/processRequest.mjs';
import path from 'path';

export const uploadFile = async (file?: Promise<FileUpload>): Promise<string | undefined> => {
  if (!file) {
    return undefined;
  }

  let filePath: string = '';

  const { createReadStream, filename } = await file;

  const uploadDir = path.join(process.cwd(), 'uploads');
  mkdirSync(uploadDir, { recursive: true });

  const uniqueName = `${Date.now()}-${filename}`;
  filePath = `/uploads/${uniqueName}`;

  await new Promise<void>((resolve, reject) => {
    createReadStream()
      .pipe(createWriteStream(path.join(uploadDir, uniqueName)))
      .on('finish', resolve)
      .on('error', reject);
  });

  return filePath;
};
