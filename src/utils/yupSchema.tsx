import * as yup from 'yup';

export type FormValues = {
  email: string;
  name: string;
  password: string;
};
export type FormValuesLogin = {
  email: string;
  password: string;
};
export const initialValuesFormikLogin = { email: '', password: '' };
export const initialValuesFormik = { email: '', name: '', password: '' };

export const yupSchemaLogin = yup.object({
  email: yup.string().required().min(5),
  password: yup.string().required().min(5),
});
export const yupSchemaRegister = yup.object({
  email: yup.string().required().min(5),
  name: yup.number().required().min(1),
  password: yup.string().required().min(5),
});
export type LoginFormValues = yup.InferType<typeof yupSchemaLogin>;
export type RegisterFormValues = yup.InferType<typeof yupSchemaRegister>;
