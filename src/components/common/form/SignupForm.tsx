'use client';

import React, { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { yupResolver } from '@hookform/resolvers/yup';
import { AuthError } from '@supabase/supabase-js';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { checkUserEmail, checkUserNickname, signUpWithSB } from '@/api/auth';
import { signupSchema } from '@/schema/formSchema';

import OrLineWithGoogleBtn from '../button/OrLineWithGoogleBtn';
import DuplicateInput from '../input/DuplicateInput';
import PasswordInput from '../input/PasswordInput';

export interface SignupFormInputList {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignupForm() {
  const resolver = yupResolver(signupSchema);
  const router = useRouter();
  const [duplicate, setDuplicate] = useState({
    nickname: true,
    email: true,
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignupFormInputList>({ mode: 'onChange', resolver });

  const onSubmit: SubmitHandler<SignupFormInputList> = async (data) => {
    const { email, password, nickname } = data;
    try {
      const res = await signUpWithSB(email, password, nickname);

      if (res instanceof AuthError || res instanceof Error) {
        toast.error('회원가입에 실패하였습니다.');
        return false;
      }
      reset();

      toast.success('회원가입에 성공하였습니다');
      router.push('/main');
    } catch (error) {
      toast.error('잠시후 다시 시도해주세요.');
    }
  };

  const checkNicknameDuplication = async () => {
    const nicknameValue = watch('nickname');

    if (!nicknameValue) {
      toast.warning('닉네임을 확인해주세요.');
      return;
    }

    try {
      const res = await checkUserNickname(nicknameValue);

      if (res) {
        setDuplicate({ ...duplicate, nickname: false });
        toast.success('사용 가능한 닉네임입니다.');
      } else {
        toast.warning('닉네임이 중복 되었습니다.');
      }
    } catch (error) {
      toast.warning('잠시후 다시 시도해주세요.');
    }
  };

  const checkEmailDuplication = async () => {
    const emailValue = watch('email');

    if (!emailValue) {
      toast.warning('이메일을 확인해주세요.');
      return;
    }

    try {
      const res = await checkUserEmail(emailValue);

      if (res) {
        setDuplicate({ ...duplicate, email: false });
        toast.success('사용 가능한 이메일입니다.');
      } else {
        toast.warning('이메일이 중복 되었습니다.');
      }
    } catch (error) {
      toast.warning('잠시후 다시 시도해주세요.');
    }
  };

  const goToSignIn = () => {
    router.push('/signin');
  };

  useEffect(() => {
    setDuplicate({ ...duplicate, nickname: true });
  }, [watch('nickname')]);

  useEffect(() => {
    setDuplicate({ ...duplicate, email: true });
  }, [watch('email')]);

  return (
    <section className="flex-box w-screen h-screen">
      <Image
        src="/images/img-signup-bg.webp"
        alt="회원가입 배경"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 max-w-[856px]"
      />
      <form
        className="relative flexcol rounded-xl bg-[#F9F9FB]
    md:w-[450px] md:h-[540px] md:px-[50px] md:py-[37px] md:gap-y-2.5
    sm:w-[320px] sm:px-[30px] sm:py-[22px] sm:gap-y-2
    "
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="text-blue border-blue border-b-2 w-[64px] text-lg font-semibold">
          회원가입
        </h3>
        <DuplicateInput
          name="nickname"
          placeholder="닉네임을 입력해주세요."
          register={register('nickname')}
          leftIcon={{ src: '/images/person.svg', alt: '사람 아이콘' }}
          errors={errors}
          duplicate={
            watch('nickname') === undefined || watch('nickname') === ''
          }
          checkFunc={checkNicknameDuplication}
        />
        <DuplicateInput
          name="email"
          placeholder="이메일을 입력해주세요."
          register={register('email')}
          leftIcon={{ src: '/images/message.svg', alt: '이메일 아이콘' }}
          errors={errors}
          duplicate={watch('email') === undefined || watch('email') === ''}
          checkFunc={checkEmailDuplication}
        />
        <PasswordInput
          name="password"
          placeholder="특수문자 포함 8~20자 이내"
          register={register('password')}
          errors={errors}
        />
        <PasswordInput
          name="confirmPassword"
          placeholder="비밀번호를 다시 입력해주세요."
          register={register('confirmPassword')}
          errors={errors}
        />
        <button
          disabled={
            isSubmitting || !isValid || duplicate.email || duplicate.nickname
          }
          name="signup-submit-btn"
          className="h-[45px] rounded-lg text-white bg-blue hover:bg-blue_dark disabled:bg-gray_light_3"
        >
          회원가입
        </button>
        <OrLineWithGoogleBtn />
        <p
          className="absolute left-1/2 -translate-x-1/2 w-[235px] text-sm p-2 rounded-lg font-semibold text-gray_dark_1 
          md:bottom-[-50px] md:bg-white/20
          sm:bottom-[-50px] sm:bg-white/50
        "
        >
          이미 계정이 있나요?
          <span
            onClick={goToSignIn}
            className="ml-2 underline text-black cursor-pointer"
          >
            지금 로그인하세요!
          </span>
        </p>
      </form>
    </section>
  );
}
