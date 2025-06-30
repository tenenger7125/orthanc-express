import { DICOM_TAG_KEY } from '@/constant/dicom';

export const generateTag = (key: DICOM_TAG_KEY, value: string) => {
  return { key, value };
};
