export enum DICOM_STATUS_CODE {
  SUCCESS = 0,
  PENDING = 1,
  FAILURE = 2,
}

export enum DICOM_TAG_KEY {
  UID = '0020000D',
  PATIENT_NAME = '00100010',
  QUERY_LEVEL = '00080052',
}

export const DICOM_TAG_VALUE = {
  QUERY_LEVEL: {
    STUDY: 'STUDY',
    SERIES: 'SERIES',
    IMAGE: 'IMAGE',
  },
};
