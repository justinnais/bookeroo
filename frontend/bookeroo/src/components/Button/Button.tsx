import {
  Button as ButtonMU,
  ButtonProps,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface Props extends ButtonProps {
  children?: React.ReactNode;
  to?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      textTransform: 'capitalize',
    },
  })
);

/**
 * Button component that extends a regular button
 * @param props optional link string, and MUI button props
 * @returns Button
 */
export default function Button(props: Props) {
  const classes = useStyles();

  return (
    <ButtonMU
      color='inherit'
      component={props.to ? RouterLink : ButtonMU}
      {...props}
      className={classes.button}
      disableElevation
    >
      {props.children}
    </ButtonMU>
  );
}
