import path from 'path';

export const PATH = {
  ROOT: process.cwd(),
  get DB_MODEL_PATH() {
    return path.join(this.ROOT, 'src', 'database', 'models');
  },
  get DICOM_DATA() {
    return path.join(this.ROOT, 'data');
  },
  DICOM_DEFAULT_FOLDER_PATH(uid: string) {
    return path.join(this.DICOM_DATA, uid);
  },
  DICOM_NEW_FOLDER_PATH(uid: string) {
    return path.join(this.DICOM_DEFAULT_FOLDER_PATH(uid), 'dicom');
  },
  DICOM_IMAGE_FOLDER_PATH(uid: string) {
    return path.join(this.DICOM_DATA, uid, 'image');
  },
};
