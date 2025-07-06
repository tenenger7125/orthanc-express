import { data } from 'dcmjs';
import fs from 'fs';
import path from 'path';

import { VR } from '@/constant/dicom-message';

import { getFileInfo } from './dicom-info';

type DicomObject = {
  [key in string]: {
    vr: (typeof VR)[number];
    Value: [string | number | object];
    _rawValue?: [string | number | object];
  };
};

export const readDicomFiles = async ({ uid }: { uid: string }) => {
  const { newFolderPath } = getFileInfo({ uid });
  const fileNames = fs.readdirSync(newFolderPath);

  const data = await Promise.all(
    fileNames.map(
      fileName =>
        new Promise<{
          meta: DicomObject;
          dict: DicomObject;
        }>(resolve => resolve(readDicomFile(newFolderPath, fileName)))
    )
  );

  return data;
};

export const readDicomFile = async (folderPath: string, fileName: string) => {
  const { buffer } = fs.readFileSync(path.join(folderPath, fileName));
  const { meta, dict } = data.DicomMessage.readFile(buffer) as { meta: DicomObject; dict: DicomObject };

  return { meta, dict };
};
