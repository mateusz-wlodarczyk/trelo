import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useFormik } from 'formik';

import { InputEl } from '../components/InputEl';
import { useAuthContext } from '../context/contextSupabase';
import { ROUTES } from '../utils/constans';
import {
  FormValues,
  initialValuesFormik,
  RegisterFormValues,
  yupSchemaLogin,
} from '../utils/yupSchema';

export const Register = () => {
  const navigate = useNavigate();

  const { errorRegister, registerNewUser } = useAuthContext();
  const formik = useFormik<FormValues>({
    enableReinitialize: true,
    initialValues: initialValuesFormik,
    onSubmit: () => {
      registerNewUser(formik.values);
      if (errorRegister) navigate(`${ROUTES.info}`);
    },
    validationSchema: yupSchemaLogin,
  });

  return (
    <>
      <div className='auth'>
        {/* //Expected 0 type arguments, but got 1. */}
        <form onSubmit={formik.handleSubmit}>
          <InputEl<RegisterFormValues> accessor='email' formik={formik} />
          <InputEl<RegisterFormValues> accessor='name' formik={formik} />
          <InputEl<RegisterFormValues> accessor='password' formik={formik} />
          <Button type='submit'>register</Button> <Button type='button'>cancel</Button>
        </form>
      </div>

      {errorRegister && (
        <p className='warnings'>please use the right email, name or passowrd to register</p>
      )}
      <Link to={ROUTES.login}>login</Link>
    </>
  );
};
