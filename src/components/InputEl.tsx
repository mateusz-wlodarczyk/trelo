import React from 'react';
import { TextField } from '@mui/material';
import { FormikProps } from 'formik';

//jak to otypowac?<T extends Record<string, string | number>>
export const InputEl = ({ accessor, formik }: { accessor: string; formik: FormikProps<T> }) => {
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
