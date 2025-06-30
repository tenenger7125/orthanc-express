import axios from 'axios';

import { env } from '@/config';
import { dicomEcho } from '@/util/dicom-echo';
import { dicomFind } from '@/util/dicom-find';

export class DicomService {
  async echo() {
    return await dicomEcho();
  }

  async find() {
    return await dicomFind();
  }

  async fetchStudies() {
    const raw = `${env.orthancUsername}:${env.orthancPassword}`;
    const basicToken = Buffer.from(raw).toString('base64');

    const { data } = await axios.get('http://localhost:8042/studies', {
      headers: {
        Authorization: `Basic ${basicToken}`,
      },
    });

    return data;
  }
}
