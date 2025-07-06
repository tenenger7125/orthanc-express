import { attachExtensionDicomFiles } from './dicom-attach-extension';
import { extractDicomImages } from './dicom-extract-image';
import { moveDicomFiles } from './dicom-move';

export const parseDicomFiles = async (body: { uid: string }) => {
  await moveDicomFiles(body);
  await attachExtensionDicomFiles(body);
  await extractDicomImages(body);
};
