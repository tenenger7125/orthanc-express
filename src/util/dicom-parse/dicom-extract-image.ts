import { DicomImage, NativePixelDecoder } from 'dcmjs-imaging';
import fs from 'fs-extra';
import path from 'path';
import sharp from 'sharp';

import { EXTENSION } from '@/constant/extension';

import { getFileInfo } from './dicom-info';

NativePixelDecoder.initializeAsync();

export const extractDicomImages = async ({ uid }: { uid: string }) => {
  const { newFolderPath, imageFolderPath } = getFileInfo({ uid });
  const fileNames = fs.readdirSync(newFolderPath).filter(fileName => fileName.startsWith(uid));

  await fs.mkdir(imageFolderPath, { recursive: true });
  await Promise.all(
    fileNames.map(
      fileName => new Promise(resolve => resolve(extractDicomImage(newFolderPath, imageFolderPath, fileName)))
    )
  );
};

export const extractDicomImage = async (newFolderPath: string, imageFolderPath: string, fileName: string) => {
  const { buffer } = fs.readFileSync(path.join(newFolderPath, fileName));
  const image = new DicomImage(buffer);

  // Render image.
  const renderedImage = image.render();

  // 2‑4) sharp로 PNG 파일 저장
  const imageFileName = fileName.replace(EXTENSION.DICOM, EXTENSION.PNG);
  const outPath = path.join(imageFolderPath, imageFileName);

  await sharp(Buffer.from(renderedImage.pixels), {
    raw: { width: renderedImage.width, height: renderedImage.height, channels: 4 },
  })
    .png()
    .toFile(outPath);
};
