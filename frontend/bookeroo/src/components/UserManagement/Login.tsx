import {
  Button,
  Grid,
  GridSize,
  OutlinedTextFieldProps,
  StandardTextFieldProps,
  TextField,
  TextFieldProps,
} from '@material-ui/core';
import React from 'react';
import FormCard from './FormCard';
import Formik from 'formik';
import { theme } from '../../styles/theme';
import NavigationButton from '../Layout/NavigationButton';

interface TextInputProps extends OutlinedTextFieldProps {
  gridItemSize: number;
}

export default function Login() {
  // TODO add formik and yup to actually make a form

  const TextInput = (props: TextInputProps) => {
    return (
      <Grid item xs={props.gridItemSize as GridSize}>
        <TextField
          id={props.id}
          label={props.label}
          variant='outlined'
          color='secondary'
          fullWidth
        />
      </Grid>
    );
  };

  const form = (
    <form>
      <Grid container spacing={2}>
        {/* <TextInput id='email' label='Email' gridItemSize={12} /> */}
        <Grid item xs={12}>
          <TextField
            id='password'
            label='Password'
            variant='outlined'
            color='secondary'
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='password'
            label='Password'
            variant='outlined'
            color='secondary'
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='password'
            label='Password'
            variant='outlined'
            color='secondary'
            fullWidth
          />
        </Grid>
      </Grid>
    </form>
  );

  const buttons = [
    // <NavigationButton text='Sign In' to='/login' />,
    <NavigationButton
      text='Sign In'
      variant='contained'
      color='secondary'
      disableElevation
    />,
  ];
  return <FormCard title='Sign In' form={form} buttons={buttons} />;
}
