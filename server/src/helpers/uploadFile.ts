import { createWriteStream, mkdirSync } from 'fs';
import { FileUpload } from 'graphql-upload/processRequest.mjs';
import path from 'path';

const uploadFile = async (file?: Promise<FileUpload>): Promise<string | undefined> => {
  if (!file) {
    return undefined;
  }

  let filePath: string = '';

  const { createReadStream, filename } = await file;

  const uploadDir = path.join(process.cwd(), 'uploads');
  mkdirSync(uploadDir, { recursive: true });

  const sanitizedFilename = path.basename(filename).replace(/[^a-zA-Z0-9._-]/g, '_');
  const uniqueName = `${Date.now()}-${sanitizedFilename}`;
  filePath = `/uploads/${uniqueName}`;

  await new Promise<void>((resolve, reject) => {
    createReadStream()
      .pipe(createWriteStream(path.join(uploadDir, uniqueName)))
      .on('finish', resolve)
      .on('error', reject);
  });

  return filePath;
};

export default uploadFile;
