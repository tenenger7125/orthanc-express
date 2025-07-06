import fs from 'fs';
import path from 'path';

import { PATH } from '@/constant/path';
import { dicomEcho } from '@/util/dicom-echo';
import { dicomFind } from '@/util/dicom-find';
import { dicomGet } from '@/util/dicom-get';
import { dicomMove } from '@/util/dicom-move';
import { parseDicomFiles } from '@/util/dicom-parse/dicom-parse';
import { readDicom } from '@/util/dicom-parse/dicom-read';

export class DicomService {
  async echo() {
    return await dicomEcho();
  }

  async find() {
    return await dicomFind();
  }

  async move(body: { uid: string }) {
    const data = await dicomMove(body);

    await parseDicomFiles(body);

    return data;
  }

  async get(body: { uid: string }) {
    return await dicomGet(body);
  }

  async fetchStudy({ uid }: { uid: string }) {
    const dicomPath = path.join(PATH.DICOM_DATA, uid);
    const fileNames = fs.readdirSync(dicomPath).filter(fileName => fileName.endsWith('.dcm'));

    const data = await Promise.all(
      fileNames.map(fileName => new Promise(resolve => resolve(readDicom(dicomPath, fileName))))
    );

    return data;
  }
}
