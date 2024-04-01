import type { FieldErrors, UseFormRegisterReturn } from 'react-hook-form';

export type InputCompProps<T extends Object> = {
  name: keyof T;
  placeholder: string;
  register: UseFormRegisterReturn<string>;
  errors: FieldErrors<T>;
};
