import { createTheme } from '@mui/material';
export const sxTextarea = {
  backgroundColor: 'gray',
  borderRadius: '15px',
  borderStyle: '1px solid red',
  color: 'white',
  margin: '1px',
  overflow: 'hidden',
  overflowWrap: 'break-word',
  padding: '0px',
  resize: 'none',
  width: '100%',
  wordBreak: 'break-all',
  wordWrap: 'break-word',
};

export const sxButton = {
  color: 'white',
  margin: '2px',
  padding: '2px',
};

export const themeTextArea = createTheme({
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {},
      },
    },

    MuiInputBase: {
      styleOverrides: {
        input: {
          backgroundColor: 'gray',
          borderRadius: '5px',
        },
        root: {
          backgroundColor: 'gray',

          margin: '0px',
          padding: '0px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { margin: '5px', padding: '5px' },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: { margin: '0px', padding: '0px' },
      },
    },
  },
});
