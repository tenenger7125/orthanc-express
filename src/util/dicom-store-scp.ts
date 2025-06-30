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
    const msg = JSON.parse(result);

    // retrieve and store the image
    if (msg.message === 'BUFFER_STORAGE') {
      const buff = Buffer.from(msg.container.base64, 'base64');
      const directory = `${scpOptions.storagePath}/${msg.container.StudyInstanceUID}`;
      const filepath = `${directory}/${msg.container.SOPInstanceUID}.dcm`;
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
      }
      fs.writeFile(filepath, buff, 'binary', err => {
        if (err) console.log(err);
        else console.log(`The file was saved to ${filepath}`);
      });
    } else {
      console.log(msg);
    }
  });
};

const generateFolder = async (path?: string) => {
  if (!path) return;

  if (!(await fs.exists(path))) {
    await fs.mkdir(path);
  }
};
