import React from 'react';
import { TextField } from '@mui/material';
import { FormikProps } from 'formik';

import { FormValues, FormValuesLogin } from '../utils/yupSchema';

export const InputEl = ({
  accessor,
  formik,
}: {
  accessor: keyof FormValues | keyof FormValuesLogin;
  formik: FormikProps<FormValues>;
}) => {
  return (
    <div>
      <TextField
        error={Boolean(formik.touched[accessor] && formik.errors[accessor])}
        id={accessor}
        label={accessor}
        name={accessor}
        value={formik.values[accessor]}
        helperText={
          formik.touched[accessor] && formik.errors[accessor]
            ? (formik.errors[accessor] as string) || ''
            : ''
        }
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />
    </div>
  );
};
