const auth = {
  AUTH: {
    ROOT: '/auth',
    LOGIN: '/login',
  },
};

const dicom = {
  DICOM: {
    ROOT: '/dicom',
    STUDIES: '/studies',
  },
};

export const ROUTE = {
  ...auth,
  ...dicom,
};
