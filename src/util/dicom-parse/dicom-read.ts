import { data } from 'dcmjs';
import fs from 'fs';
import path from 'path';

type DicomObject = {
  [key in string]: {
    vr:
      | 'AE'
      | 'AS'
      | 'AT'
      | 'CS'
      | 'DA'
      | 'DS'
      | 'DT'
      | 'FL'
      | 'FD'
      | 'IS'
      | 'LO'
      | 'LT'
      | 'OB'
      | 'OD'
      | 'OF'
      | 'OW'
      | 'PN'
      | 'SH'
      | 'SL'
      | 'SQ'
      | 'SS'
      | 'ST'
      | 'TM'
      | 'UI'
      | 'UL'
      | 'UN'
      | 'US'
      | 'UT';
    Value: [string | number | object];
    _rawValue?: [string | number | object];
  };
};

export const readDicom = async (folderPath: string, fileName: string) => {
  const { buffer } = fs.readFileSync(path.join(folderPath, fileName));
  const { meta, dict } = data.DicomMessage.readFile(buffer) as { meta: DicomObject; dict: DicomObject };

  return { meta, dict };
};
