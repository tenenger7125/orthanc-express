import path from 'path';

export const PATH = {
  DICOM_DATA: path.join(process.cwd(), 'data'),
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
