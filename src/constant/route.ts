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
    MOVE: '/move',
    GET: '/get',
  },
};

export const ROUTE = {
  ...auth,
  ...dicom,
};
