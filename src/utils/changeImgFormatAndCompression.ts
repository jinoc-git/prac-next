import imageCompression from 'browser-image-compression';

// webp를 사용할 지 고민
// const convertImageToWebP = (file: Blob) => {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.src = URL.createObjectURL(file);
//     img.onload = () => {
//       const canvas = document.createElement('canvas');
//       canvas.width = img.width;
//       canvas.height = img.height;
//       const ctx = canvas.getContext('2d');
//       ctx?.drawImage(img, 0, 0);

//       canvas.toBlob((blob) => {
//         if (blob) {
//           resolve(blob);
//         } else {
//           reject(new Error('Image conversion failed'));
//         }
//       }, 'image/webp');
//     };
//     img.onerror = reject;
//   });
// };

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
