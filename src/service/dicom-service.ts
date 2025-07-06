import { dicomEcho } from '@/util/dicom-echo';
import { dicomFind } from '@/util/dicom-find';
import { dicomGet } from '@/util/dicom-get';
import { dicomMove } from '@/util/dicom-move';
import { parseDicomFiles } from '@/util/dicom-parse/dicom-parse';
import { readDicomFiles } from '@/util/dicom-parse/dicom-read';

import { DicomMessage, DicomMessageCreationAttributes } from '../database/models/init-models';

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

    const dicomMessages = await readDicomFiles(body);

    await Promise.all(
      dicomMessages.map(async ({ meta, dict }) => {
        const message = { ...meta, ...dict };
        const tags = Object.keys(message);

        await Promise.all(
          tags.map(async tag => {
            const { vr, Value, _rawValue } = message[tag];

            const attr = {
              study_uid: body.uid,
              tag,
              vr,
              value: Value.toString(),
              raw_value: _rawValue?.toString(),
            } as DicomMessageCreationAttributes;

            await DicomMessage.upsert(attr);
          })
        );
      })
    );

    return data;
  }

  async get(body: { uid: string }) {
    return await dicomGet(body);
  }
}
