'use client';

import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { yupResolver } from '@hookform/resolvers/yup';
import { AuthError } from '@supabase/supabase-js';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { signInWithSB } from '@/api/auth';
import { signinSchema } from '@/schema/formSchema';

import OrLineWithGoogleBtn from '../button/OrLineWithGoogleBtn';
import IconInput from '../input/IconInput';
import PasswordInput from '../input/PasswordInput';

import type { SignupFormInputList } from './SignupForm';

export type SigninFormInputList = Omit<
  SignupFormInputList,
  'nickname' | 'confirmPassword'
>;

export default function SigninForm() {
  const resolver = yupResolver(signinSchema);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SigninFormInputList>({ mode: 'onChange', resolver });

  const onSubmit: SubmitHandler<SigninFormInputList> = async (data) => {
    const { email, password } = data;

    const res = await signInWithSB(email, password);

    if (res instanceof AuthError) {
      toast.error('로그인에 실패하였습니다.');
      return false;
    }

    // setVisibilityIcon(true);
    reset();
    toast.success('로그인에 성공하였습니다.');
    router.push('/main');
  };

  const goToSignUp = () => {
    router.push('/signin');
  };

  return (
    <>
      <Image
        src="/images/img-signin-bg.webp"
        alt="로그인 배경"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 max-w-[856px]"
      />
      <form
        className="relative flexcol gap-y-2.5 rounded-xl bg-[#F9F9FB]
        md:w-[450px] md:h-[410px] md:px-[50px] md:py-[37px]
        sm:w-[320px] sm:px-[30px] sm:py-[22px]
        "
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="border-b-2 w-[48px] text-lg font-semibold	text-blue border-blue">
          로그인
        </h3>
        <IconInput
          name="email"
          placeholder="이메일을 입력해주세요."
          register={register('email')}
          leftIcon={{
            src: '/images/message.svg',
            alt: '이메일 아이콘',
            w: 10,
            h: 12,
          }}
        />
        <PasswordInput
          name="password"
          placeholder="특수문자 포함 8~20자 이내"
          register={register('password')}
          errors={errors}
        />
        <button
          disabled={isSubmitting || !isValid}
          name="signup-submit-btn"
          className="h-[45px] rounded-lg text-white bg-blue hover:bg-blue_dark disabled:bg-gray_light_3"
        >
          로그인
        </button>
        <OrLineWithGoogleBtn />
        <p
          className="absolute left-1/2 -translate-x-1/2 w-[235px] text-sm p-2 rounded-lg font-semibold text-gray_dark_1 
          md:bottom-[-50px] md:bg-white/20
          sm:bottom-[-50px] sm:bg-white/50
        "
        >
          처음이신가요?
          <span
            onClick={goToSignUp}
            className="ml-2 underline text-black cursor-pointer"
          >
            지금 등록하세요!
          </span>
        </p>
      </form>
    </>
  );
}
