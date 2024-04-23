import imageCompression from 'browser-image-compression';

export const changeImgFormatAndCompression = async (file: File) => {
  const { default: convertHeicToAnyFormat } = await import('heic2any');

  let acceptFile = file;

  const options = {
    maxSizeMB: 5,
    maxWidthOrHeight: 1920,
  };

  const isIOSImage =
    file.type === 'image/heic' ||
    file.type === 'image/HEIC' ||
    file.type === 'image/HEIF' ||
    file.type === 'image/heif';

  if (isIOSImage) {
    const convertedBlob = await convertHeicToAnyFormat({ blob: file, toType: 'image/jpeg' });

    const convertedFile = new File([convertedBlob as Blob], file.name.split('.')[0] + '.jpeg', {
      type: 'image/jpeg',
    });

    acceptFile = convertedFile;
  }

  const compressedFile = await imageCompression(acceptFile, options);
  const url = URL.createObjectURL(compressedFile);

  return { compressedFile, url };
};
