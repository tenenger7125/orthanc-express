import fs from 'fs-extra';
import path from 'path';

import { EXTENSION } from '@/constant/extension';
import { PATH } from '@/constant/path';

export const convertDicomFiles = async (body: { uid: string }) => {
  const { oldFolderPath, newFolderPath, fileNames } = getFileInfo(body);

  await Promise.all(fileNames.map(fileName => moveFile(oldFolderPath, newFolderPath, fileName)));
  await Promise.all(fileNames.map(fileName => attachDicomExtension(newFolderPath, fileName)));
};

const attachDicomExtension = async (newFolderPath: string, fileName: string) => {
  const oldFilePath = path.join(newFolderPath, fileName);
  const newFilePath = `${oldFilePath}${EXTENSION.DICOM}`;

  await fs.rename(oldFilePath, newFilePath);
};

const moveFile = async (oldFolderPath: string, newFolderPath: string, fileName: string) => {
  const oldfilePath = path.join(oldFolderPath, fileName);
  const newFilePath = path.join(newFolderPath, fileName);

  await fs.move(oldfilePath, newFilePath, { overwrite: true });
};

const getFileInfo = ({ uid }: { uid: string }) => {
  const DICOM = 'dicom';

  const oldFolderPath = path.join(PATH.DICOM_DATA, uid);
  const newFolderPath = path.join(oldFolderPath, DICOM);

  const fileNames = fs.readdirSync(oldFolderPath).filter(fileName => fileName.startsWith(uid));

  return {
    oldFolderPath,
    newFolderPath,
    fileNames,
  };
};
