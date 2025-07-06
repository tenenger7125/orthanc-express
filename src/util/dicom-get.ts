import { getScu, getScuOptions } from 'dicom-dimse-native';

import { env } from '@/config';

import { DICOM_STATUS_CODE, DICOM_TAG_KEY, DICOM_TAG_VALUE } from '../constant/dicom';
import { PATH } from '../constant/path';
import { dicomResponseParse } from './dicom-response-parse';
import { generateTag } from './dicom-tag';

const defaultOptions: getScuOptions = {
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
  storagePath: PATH.DICOM_DATA,
  verbose: true,
};

export const dicomGet = ({ uid }: { uid: string }) => {
  return new Promise((resolve, reject) => {
    const uidTag = generateTag(DICOM_TAG_KEY.UID, uid);
    const options = { ...defaultOptions, tags: [...defaultOptions.tags, uidTag] };

    getScu(options, result => {
      const data = dicomResponseParse(result);

      if (data.code === DICOM_STATUS_CODE.SUCCESS) resolve(data);
      else if (data.code === DICOM_STATUS_CODE.FAILURE) reject(data.message);
    });
  });
};
