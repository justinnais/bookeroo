import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  ButtonProps,
  IconButton,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import NavigationButton from './NavigationButton';

/**
 * This is the component styling - we use this to create classes that apply only to things in this component
 * If you need to create global styles, they go in App.scss
 * If you want to change part of the MaterialUI theme, edit the theme.tsx
 */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: 'none', // removes shadow from navbar
      //   color: theme.palette.secondary.main, // sets text colour to main accent colour
    },
    toolbar: {
      justifyContent: 'space-between', // spaces items in navbar apart from each other
    },
    menuButton: {
      [theme.breakpoints.up('sm')]: { display: 'none' }, // hide menu button on screens above small
    },
    navButtons: {
      '& *': {
        textTransform: 'capitalize',
      },
      [theme.breakpoints.down('xs')]: { display: 'none' }, // hide nav button on screens below xs
    },
    logo: {
      textTransform: 'uppercase',
      color: theme.palette.secondary.main,
      textDecoration: 'inherit',
    },
  })
);

interface HeaderButtonProps extends ButtonProps {
  text: string;
  to?: string;
}

/**
 * Header component located at top of web page
 */
export default function Header() {
  const classes = useStyles();

  /* I have created these components, HeaderButton, MenuButton, NavButton and Logo
     They are just local in this Header.tsx file as they are likely unique to this component for now
     If I was to then use one of these outside of this file, remove it from here and make its own functional component

     UPDATE - I have moved HeaderButton into a new component NavigationButton, as it was being used elsewhere. 
     I have left the code in for now to demonstrate the change from local component to its own functional component.
  */

  /**
   * Button component that extends a regular button
   * @param props text string, optional link string, and MUI button props
   * @returns button
   * @deprecated replaced by NavigationButton component
   *
   */
  const HeaderButton = (props: HeaderButtonProps) => (
    <Button
      color='inherit'
      component={props.to ? RouterLink : Button}
      {...props}
    >
      {props.text}
    </Button>
  );

  /**
   * Menu button that displays on small screens, contains all links that would show on larger screens
   */
  const MenuButton = () => (
    <IconButton
      edge='start'
      className={classes.menuButton}
      color='inherit'
      aria-label='menu'
    >
      <MenuIcon />
    </IconButton>
  );

  /**
   * Navigation links that show on large screens
   */
  const NavButtons = () => (
    <>
      <div className={classes.navButtons}>
        <NavigationButton text='Search' onClick={() => console.log('search')} />
        <NavigationButton text='Books' />
        <NavigationButton text='Sell Books' />
      </div>
      <div className={classes.navButtons}>
        <NavigationButton text='Sign In' to='/login' />
        <NavigationButton
          text='Sign Up'
          variant='contained'
          color='secondary'
          disableElevation
        />
      </div>
    </>
  );

  const Logo = () => (
    <Typography
      variant='h6'
      className={classes.logo}
      component={RouterLink}
      to='/'
    >
      Bookeroo
    </Typography>
  );

  /**
   * This is what is rendered by the component, we can see that it has the AppBar and Toolbar,
   * which contain the Logo, NavButtons and MenuButton components we created above
   */
  return (
    <AppBar position='static' className={classes.root}>
      <Container>
        <Toolbar className={classes.toolbar} disableGutters>
          <Logo />
          <NavButtons />
          <MenuButton />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
