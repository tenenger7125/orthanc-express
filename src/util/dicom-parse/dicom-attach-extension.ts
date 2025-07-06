import fs from 'fs-extra';
import path from 'path';

import { EXTENSION } from '@/constant/extension';

import { getFileInfo } from './dicom-info';

export const attachExtensionDicomFiles = async (body: { uid: string }) => {
  const { newFolderPath } = getFileInfo(body);
  const fileNames = fs
    .readdirSync(newFolderPath)
    .filter(fileName => fileName.startsWith(body.uid))
    .filter(filename => !filename.endsWith(EXTENSION.DICOM));

  await Promise.all(fileNames.map(fileName => attachExtensionDicomFile(newFolderPath, fileName)));
};

const attachExtensionDicomFile = async (newFolderPath: string, fileName: string) => {
  const oldFilePath = path.join(newFolderPath, fileName);
  const newFilePath = `${oldFilePath}${EXTENSION.DICOM}`;

  await fs.rename(oldFilePath, newFilePath);
};
