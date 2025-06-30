export type DicomResponse = {
  code: 0 /** (success) */ | 1 /** (pending) */ | 2 /** (failure) */;
  container: null | string /** 'DICOMJSON (only when using c-find)' */;
  message: string /** 'request succeeded' / 'descriptive problem' */;
  status: 'success' | 'pending' | 'failure';
};
