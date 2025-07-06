import { moveScu, moveScuOptions } from 'dicom-dimse-native';

import { env } from '@/config';
import { DICOM_STATUS_CODE, DICOM_TAG_KEY, DICOM_TAG_VALUE } from '@/constant/dicom';

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
        resolve(data);
      } else if (data.code === DICOM_STATUS_CODE.FAILURE) reject(data.message);
    });
  });
};
