import {
  Button,
  ButtonProps,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import React from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';

interface Props extends ButtonProps {
  text: string;
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
 * Button component that extends a regular button to be used in navigation bars, eg Header, Footer
 * @param props text string, optional link string, and MUI button props
 * @returns Button
 */
export default function NavigationButton(props: Props) {
  const classes = useStyles();

  return (
    <Button
      color='inherit'
      component={props.to ? RouterLink : Button}
      {...props}
      className={classes.button}
    >
      {props.text}
    </Button>
  );
}
