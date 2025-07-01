import { data } from 'dcmjs';
import { DicomImage, NativePixelDecoder } from 'dcmjs-imaging';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

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

NativePixelDecoder.initializeAsync();

export const readDicom = async (folderPath: string, fileName: string) => {
  const { buffer } = fs.readFileSync(path.join(folderPath, fileName));
  const { meta, dict } = data.DicomMessage.readFile(buffer) as { meta: DicomObject; dict: DicomObject };

  const image = new DicomImage(buffer);

  // Render image.
  const renderedImage = image.render();

  // 2‑4) sharp로 PNG 파일 저장
  const imageFileName = fileName.replace('.dcm', '.png');
  const outPath = path.join(folderPath, imageFileName);
  await sharp(Buffer.from(renderedImage.pixels), {
    raw: { width: renderedImage.width, height: renderedImage.height, channels: 4 },
  })
    .png()
    .toFile(outPath);

  return { meta, dict };
};
