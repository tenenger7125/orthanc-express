import axios from 'axios';

import { env } from '../config';

export class DicomService {
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
