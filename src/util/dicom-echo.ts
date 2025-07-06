import { echoScu, echoScuOptions } from 'dicom-dimse-native';

import { env } from '@/config';
import { DicomResponse } from '@/types/dicom';

import { DICOM_STATUS_CODE } from '../constant/dicom';
import { dicomResponseParse } from './dicom-response-parse';

const options: echoScuOptions = {
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
  verbose: true,
};

export const dicomEcho = () => {
  return new Promise<DicomResponse>((resolve, reject) => {
    echoScu(options, result => {
      const data = dicomResponseParse(result);

      if (data.code === DICOM_STATUS_CODE.SUCCESS) resolve(data);
      else if (data.code === DICOM_STATUS_CODE.FAILURE) reject(data.message);
    });
  });
};
