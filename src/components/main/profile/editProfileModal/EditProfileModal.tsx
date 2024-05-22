'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';

import ModalLayout from '@/components/common/layout/ModalLayout';
import { editProfileSchema } from '@/schema/editProfileSchema';

interface Props {
  handleCloseModal: () => void;
  isAnimate: boolean;
}

const EditProfileModal = ({ isAnimate, handleCloseModal }: Props) => {
  const resolver = yupResolver(editProfileSchema);

  const {
    handleSubmit,
    register,
    watch,
    resetField,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ mode: 'onChange', resolver });

  return (
    <ModalLayout isAnimate={isAnimate}>
      <form
        className="relative flexcol items-center align-middle rounded-xl
        md:h-[575px] md:w-[396px] md:justify-between md:gap-0
        sm:h-[404px] sm:w-[310px] sm:gap-[15px]"
      >
        <div className="md:flex items-center gap-3 w-full">
          <Image
            src="/images/svgs/userDefault.svg"
            alt="프로필 아이콘"
            width={30}
            height={30}
            className="w-[30px] h-[30px] md:block sm:hidden rounded-full border border-gray"
          />
          <p className="font-semibold md:text-xlg sm:text-lg text-gray_dark_2">프로필 편집</p>
          <p className="md:hidden text-[16px]">프로필 사진과 닉네임을 변경하세요 </p>
        </div>
        <div className="relative hover:brightness-75 sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px]">
          <label htmlFor="avatar">
            <Image
              src="/images/svgs/userDefault.svg"
              alt="프로필 아이콘"
              width={200}
              height={200}
              className="w-full h-full rounded-full border-[2.5px] border-gray object-cover cursor-pointer"
            />
            <div
              className="absolute flex-box w-[42px] h-[42px] rounded-full bg-white border-[2px] border-gray cursor-pointer
              md:top-3/4 md:left-[140px]
              sm:top-3/4 sm:left-[110px]
              "
            >
              <Image
                src="/images/svgs/camera.svg"
                alt="카메라 아이콘"
                width={21}
                height={21}
                className="w-[21px] h-[21px] cursor-pointer mt-1"
              />
            </div>
          </label>
          <input
            id="avatar"
            type="file"
            accept=".jpg, .jpeg, .png, .heic, .heif, .HEIC, .HEIF"
            className="hidden"
          />
        </div>
        <p className="text-center md:text-normal sm:text-xs">
          프로필 사진은 정사각형 비율로 된 사진을 업로드해 주세요. <br />
          (100 X 100픽셀 권장)
        </p>
        {/* <DuplicateInput /> */}
        <div className="flex justify-between md:w-[408px] sm:w-[310px]">
          <button
            name="profile-remove-avatar-btn"
            type="button"
            // onClick={removeAvatarBtnHandler}
            className="border border-navy rounded-lg text-navy hover:bg-navy_light_1 disabled:bg-gray_light_3 
              md:w-[200px] md:h-[45px]
              sm:w-[150px] sm:h-[41px]
              "
            // disabled={previewImg === ''}
          >
            사진 제거
          </button>
          <button
            name="profile-change-btn"
            // disabled={shouldBlockSubmitBtn.result}
            type="submit"
            className="border rounded-lg bg-navy text-white hover:bg-navy_light_3 disabled:bg-gray_light_3
              md:w-[200px] md:h-[45px]
              sm:w-[150px] sm:h-[41px]
              "
          >
            프로필 변경
            {/* {isSubmitting && '제출중'} */}
          </button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default EditProfileModal;
