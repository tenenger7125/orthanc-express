import { DicomService } from '@/service/dicom-service';

export class DicomController {
  #dicomService: DicomService;

  constructor() {
    this.#dicomService = new DicomService();
  }

  async echo() {
    return await this.#dicomService.echo();
  }

  async find() {
    return await this.#dicomService.find();
  }

  async move(body: { uid: string }) {
    return await this.#dicomService.move(body);
  }

  async get(body: { uid: string }) {
    return await this.#dicomService.get(body);
  }
}
