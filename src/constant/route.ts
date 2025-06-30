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
    ECHO: '/echo',
    FIND: '/find',
  },
};

export const ROUTE = {
  ...auth,
  ...dicom,
};
