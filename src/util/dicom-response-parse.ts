import { DicomResponse } from '../types/dicom';

export const dicomResponseParse = (result: string) => {
  const { container, ...rest } = JSON.parse(result) as DicomResponse;
  return { container: parse(container), ...rest };
};

const parse = (value: string | null | object) => {
  if (!value || typeof value === 'object') return value;

  try {
    const parsed = JSON.parse(value);
    return parsed;
  } catch {
    return value;
  }
};
