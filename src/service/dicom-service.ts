import { dicomEcho } from '@/util/dicom-echo';
import { dicomFind } from '@/util/dicom-find';
import { dicomGet } from '@/util/dicom-get';
import { dicomMove } from '@/util/dicom-move';
import { parseDicomFiles } from '@/util/dicom-parse/dicom-parse';
import { readDicomFiles } from '@/util/dicom-parse/dicom-read';

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
    await readDicomFiles(body);

    return data;
  }

  async get(body: { uid: string }) {
    return await dicomGet(body);
  }
}
