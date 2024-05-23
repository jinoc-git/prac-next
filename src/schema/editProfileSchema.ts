import * as yup from 'yup';

const nicknameRegExp = /^[가-힣|a-z|A-Z|0-9|]{2,6}$/;

const IMAGE_TYPE = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/heic',
  'image/heif',
  'image/HEIC',
  'image/HEIF',
];

const avatar = yup.mixed<FileList>().test('type', 'Invalid file type', (val?: FileList) => {
  console.log('in', val);
  return val && val[0] && IMAGE_TYPE.includes(val[0].type);
});

const nickname = yup.string().when(([val], schema) => {
  return val && val !== ''
    ? yup
        .string()
        .min(2, '닉네임은 2자리 이상이어야 합니다.')
        .max(6, '닉네임은 6자리 이하이어야 합니다.')
        .matches(nicknameRegExp, '닉네임은 2~6자, 특수문자 불가입니다.')
    : schema;
});

export interface EditProfile {
  avatar?: FileList;
  nickname?: string;
}

export const editProfileSchema = yup.object().shape({
  avatar,
  nickname,
});
