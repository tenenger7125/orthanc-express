import { startStoreScp, storeScpOptions } from 'dicom-dimse-native';
import fs from 'fs-extra';

import { env } from '@/config';

import { PATH } from '../constant/path';

const scpOptions: storeScpOptions = {
  source: {
    aet: env.dicomSourceAet,
    ip: env.dicomSourceIp,
    port: env.dicomSourcePort,
  },
  peers: [
    {
      aet: env.dicomTargetAet,
      ip: env.dicomTargetIp,
      port: env.dicomTargetPort,
    },
  ],
  storagePath: PATH.DICOM_DATA,
  verbose: true,
};

// starting the store scp for this example to actually receive anything from the move
export const dicomStoreScpConnect = async () => {
  await generateFolder(scpOptions.storagePath);

  startStoreScp(scpOptions, result => {
    console.log(JSON.parse(result));
  });
};

const generateFolder = async (path?: string) => {
  if (!path) return;

  if (!(await fs.exists(path))) {
    await fs.mkdir(path);
  }
};
