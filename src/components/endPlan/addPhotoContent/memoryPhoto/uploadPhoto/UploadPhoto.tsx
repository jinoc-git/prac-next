'use client';

import React from 'react';

import Image from 'next/image';

import { changeImgFormatAndCompression } from '@/utils/changeImgFormatAndCompression';

interface Props {
  setUploadedImg: React.Dispatch<React.SetStateAction<File[]>>;
}

const UploadPhoto = ({ setUploadedImg }: Props) => {
  const [preview, setPreview] = React.useState<string[]>([]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const { compressedFile, url } = await changeImgFormatAndCompression(file);

      setPreview((prev) => [...prev, url]);
      setUploadedImg((prev) => [...prev, compressedFile]);
    }
  };

  const handleDeleteFile = (idx: number) => {
    setPreview((prev) => prev.toSpliced(idx, 1));
    setUploadedImg((prev) => prev.toSpliced(idx, 1));
  };

  return (
    <div
      className="flex flex-wrap mx-auto mt-[10px]
        sm:w-[286px] sm:gap-[10px]
        md:w-[640px] md:gap-[20px]
      "
    >
      <input
        accept=".jpg, .jpeg, .png, .heic, .heif, .HEIC, .HEIF"
        onChange={handleFileChange}
        type="file"
        id="addpicture-input"
        name="addpicture-input"
        className="hidden"
      />
      <label
        htmlFor="addpicture-input"
        className="flex-box border-dashed border rounded-lg cursor-pointer hover:bg-blue_light_0 normal-transition
        sm:w-[268px] sm:h-[56px] 
        md:w-[200px] md:h-[200px] "
      >
        <div className="flex-box gap-2 text-gray-300">
          <Image
            src={'/images/svgs/upload-photo.svg'}
            width={24}
            height={24}
            alt="사진 업로드 아이콘"
          />
          <p className="font-bold text-normal text-gray_dark_1">사진업로드</p>
        </div>
      </label>
      {preview.map((src, idx) => {
        return (
          <div
            key={`${idx},${src}`}
            className="flex-box relative
              sm:w-[128px] sm:h-[128px]
              md:w-[200px] md:h-[200px] 
            "
          >
            <Image
              src={src}
              width={200}
              height={200}
              alt={`업로드 사진 ${idx + 1}`}
              className="rounded-lg object-cover w-full h-full"
            />
            <button
              className="absolute top-0 right-0 flex-box  w-8 h-8 bg-[#444040b8] text-white rounded-lg opacity-50 hover:opacity-100 normal-transition"
              name="delete-uploaded-photo-button"
              type="button"
              onClick={() => handleDeleteFile(idx)}
            >
              X
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default UploadPhoto;
