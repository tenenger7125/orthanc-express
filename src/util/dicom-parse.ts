import { DicomResponse } from '../types/dicom';

export const dicomResponseParse = (result: string) => {
  const { container, ...rest } = JSON.parse(result) as DicomResponse;
  return { container: container ? JSON.parse(container) : null, ...rest };
};
