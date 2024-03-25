import * as yup from 'yup';

const title = yup
  .string()
  .required('제목은 필수입니다.')
  .min(1, '제목은 1글자 이상이어야 합니다.')
  .max(12, '제목은 12글자 이하여야 합니다.');

const totalCost = yup.string().required('예산은 필수입니다.');

export const addPlanSchema = yup.object().shape({ title, totalCost });
