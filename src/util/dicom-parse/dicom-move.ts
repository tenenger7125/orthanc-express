import fs from 'fs-extra';
import path from 'path';

import { getFileInfo } from './dicom-info';

export const moveDicomFiles = async (body: { uid: string }) => {
  const { oldFolderPath, newFolderPath } = getFileInfo(body);
  const fileNames = fs.readdirSync(oldFolderPath).filter(fileName => fileName.startsWith(body.uid));

  await Promise.all(fileNames.map(fileName => moveDicomFile(oldFolderPath, newFolderPath, fileName)));
};

const moveDicomFile = async (oldFolderPath: string, newFolderPath: string, fileName: string) => {
  const oldfilePath = path.join(oldFolderPath, fileName);
  const newFilePath = path.join(newFolderPath, fileName);

  await fs.move(oldfilePath, newFilePath, { overwrite: true });
};
