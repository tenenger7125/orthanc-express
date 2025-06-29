import { DicomService } from '../service/dicom-service';

export class DicomController {
  #dicomService: DicomService;

  constructor() {
    this.#dicomService = new DicomService();
  }

  async getStudies() {
    const studies = await this.#dicomService.fetchStudies();
    return studies;
  }
}
