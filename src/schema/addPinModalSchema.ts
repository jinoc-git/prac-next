import * as yup from 'yup';

const placeNameRegExp = /^[가-힣|a-z|A-Z|0-9|\s-]*$/;
const addressRegExp = /^[가-힣|0-9|\s-]*$/;

const placeName = yup
  .string()
  .required('장소 이름은 필수 입니다.')
  .matches(placeNameRegExp, '모음, 자음 안됨')
  .min(1, '장소 이름은 1자 이상이어야 합니다.')
  .max(12, '장소 이름은 12자 이하여야 합니다.');

const address = yup
  .string()
  .required('주소는 필수 입니다.')
  .matches(addressRegExp, '모음, 자음 안됨');

const cost = yup.string();

export const addPinSchema = yup.object().shape({
  placeName,
  address,
  cost,
});
