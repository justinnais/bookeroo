import {
  AppBar,
  Container,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
} from '@material-ui/core';
import React from 'react';
import NavigationButton from './NavigationButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      background: theme.palette.primary.main,
    },
    toolbar: {
      justifyContent: 'flex-end', // spaces items at end of flexbox
    },
  })
);

export default function Footer() {
  const classes = useStyles();

  // can't use AppBar as it outputs a <header> which causes issues with footer positioning
  return (
    <div className={classes.root}>
      {/* <AppBar className={classes.root}> */}
      <Container>
        <Toolbar className={classes.toolbar} disableGutters>
          <NavigationButton text='Team' />
          <NavigationButton text='Contact' />
          <NavigationButton text='Help' />
        </Toolbar>
      </Container>
      {/* </AppBar> */}
    </div>
  );
}
