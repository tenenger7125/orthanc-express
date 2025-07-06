import { PATH } from '@/constant/path';

// common
export const getFileInfo = ({ uid }: { uid: string }) => {
  const oldFolderPath = PATH.DICOM_DEFAULT_FOLDER_PATH(uid);
  const newFolderPath = PATH.DICOM_NEW_FOLDER_PATH(uid);
  const imageFolderPath = PATH.DICOM_IMAGE_FOLDER_PATH(uid);

  return {
    oldFolderPath,
    newFolderPath,
    imageFolderPath,
  };
};
