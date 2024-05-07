'use client';

import React from 'react';

import Image from 'next/image';

const UploadPhoto = () => {
  const onFileChange = () => {};
  return (
    <div className="sm:w-[286px] md:w-[635px] mx-auto mt-[10px]">
      <input
        accept=".jpg, .jpeg, .png .heic .heif .HEIC .HEIF "
        onChange={onFileChange}
        type="file"
        id="addpicture-input"
        name="addpicture-input"
        className="hidden"
      />
      <label
        htmlFor="addpicture-input"
        className="flex-box border-dashed border rounded-lg cursor-pointer hover:bg-blue_light_0
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
    </div>
  );
};

export default UploadPhoto;
