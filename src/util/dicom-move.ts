import { moveScu, moveScuOptions } from 'dicom-dimse-native';
import fs from 'fs-extra';
import path from 'path';

import { env } from '@/config';
import { DICOM_STATUS_CODE, DICOM_TAG_KEY, DICOM_TAG_VALUE } from '@/constant/dicom';
import { EXTENSION } from '@/constant/extension';
import { PATH } from '@/constant/path';

import { dicomResponseParse } from './dicom-parse';
import { generateTag } from './dicom-tag';

const defaultOptions: moveScuOptions = {
  source: {
    aet: env.dicomSourceAet,
    ip: env.dicomSourceIp,
    port: env.dicomSourcePort,
  },
  target: {
    aet: env.dicomTargetAet,
    ip: env.dicomTargetIp,
    port: env.dicomTargetPort,
  },
  tags: [
    {
      key: DICOM_TAG_KEY.QUERY_LEVEL,
      value: DICOM_TAG_VALUE.QUERY_LEVEL_STUDY,
    },
  ],
  destination: env.dicomSourceAet,
  verbose: true,
};

export const dicomMove = ({ uid }: { uid: string }) => {
  const uidTag = generateTag(DICOM_TAG_KEY.UID, uid);
  const options = { ...defaultOptions, tags: [...defaultOptions.tags, uidTag] };

  return new Promise((resolve, reject) => {
    moveScu(options, async result => {
      const data = dicomResponseParse(result);

      if (data.code === DICOM_STATUS_CODE.SUCCESS) {
        await convertDicomFiles(uid);
        resolve(data);
      } else if (data.code === DICOM_STATUS_CODE.FAILURE) reject(data.message);
    });
  });
};

const convertDicomFiles = async (uid: string) => {
  const folderPath = path.join(PATH.DICOM_DATA, uid);
  const fileNames = fs.readdirSync(folderPath).filter(fileName => fileName.startsWith(uid));
  const newFolderPath = path.join(folderPath, 'dicom');

  await Promise.all(fileNames.map(fileName => moveFile(folderPath, newFolderPath, fileName)));
  return Promise.all(fileNames.map(fileName => convertDicomFile(newFolderPath, fileName)));
};

const moveFile = async (oldFolderPath: string, newFolderPath: string, fileName: string) => {
  const oldfilePath = path.join(oldFolderPath, fileName);
  const newFilePath = path.join(newFolderPath, fileName);

  await fs.move(oldfilePath, newFilePath, { overwrite: true });
};

const convertDicomFile = async (folderPath: string, fileName: string) => {
  const oldFilePath = path.join(folderPath, fileName);
  const newFilePath = `${oldFilePath}${EXTENSION.DICOM}`;
  await fs.rename(oldFilePath, newFilePath);
  return newFilePath;
};
