import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useFormik } from 'formik';

import { useAuthContext } from '../context/contextSupabase';
import {
  FormValuesLogin,
  initialValuesFormikLogin,
  LoginFormValues,
  yupSchemaLogin,
} from '../utils/yupSchema';

import { InputEl } from './InputEl';

export const Login = () => {
  const [wrongLog, setWrongLog] = useState(false);
  const navigate = useNavigate();
  const { isLogin, loginUser } = useAuthContext();

  const formik = useFormik<FormValuesLogin>({
    enableReinitialize: true,
    initialValues: initialValuesFormikLogin,
    // dwa razy trzeba klikac w login, useState laduje sie pozniej - jak rozwiazac?

    onSubmit: () => {
      loginUser(formik.values);
      if (isLogin) {
        navigate('/home');
        setWrongLog(false);
      } else {
        setWrongLog(true);
      }
    },
    validationSchema: yupSchemaLogin,
  });

  return (
    <>
      <div className='auth'>
        {/* //Expected 0 type arguments, but got 1. */}
        <form onSubmit={formik.handleSubmit}>
          <InputEl<LoginFormValues> accessor='email' formik={formik} />
          <InputEl<LoginFormValues> accessor='password' formik={formik} />
          <Button type='submit'>logIN</Button> <Button type='button'>cancel</Button>
        </form>
      </div>
      {wrongLog && <p className='warnings'>please use the right email or passowrd to login</p>}
    </>
  );
};
