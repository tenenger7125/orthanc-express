import { findScu, findScuOptions } from 'dicom-dimse-native';

import { env } from '@/config';
import { DICOM_STATUS_CODE, DICOM_TAG_KEY, DICOM_TAG_VALUE } from '@/constant/dicom';
import { DicomResponse } from '@/types/dicom';

import { dicomResponseParse } from './dicom-response-parse';

const options: findScuOptions = {
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
    { key: DICOM_TAG_KEY.UID, value: '' },
    {
      key: DICOM_TAG_KEY.PATIENT_NAME,
      value: '',
    },
    {
      key: DICOM_TAG_KEY.QUERY_LEVEL,
      value: DICOM_TAG_VALUE.QUERY_LEVEL_STUDY,
    },
  ],
  verbose: true,
};

export const dicomFind = () => {
  return new Promise<DicomResponse>((resolve, reject) => {
    findScu(options, result => {
      const data = dicomResponseParse(result);

      if (data.code === DICOM_STATUS_CODE.SUCCESS) resolve(data);
      else if (data.code === DICOM_STATUS_CODE.FAILURE) reject(data.message);
    });
  });
};
