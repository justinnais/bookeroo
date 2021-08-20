import {
  Button,
  Container,
  createStyles,
  Grid,
  GridSpacing,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import Image from 'material-ui-image';
import { theme } from '../../styles/theme';
import GridLayout from './GridLayout';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    displayImage: {
      width: '100%',
      height: 'auto',
    },
    welcomeCard: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      height: '16rem',
      justifyContent: 'space-between',
    },
  })
);

export default function Landing() {
  const classes = useStyles();

  const WelcomeCard = () => (
    <div className={classes.welcomeCard}>
      <div>
        <Typography color='textSecondary' gutterBottom>
          Welcome to
        </Typography>

        <Typography variant='h2' component='h2'>
          Bookeroo
        </Typography>
      </div>
      <Typography variant='body2' component='p'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus cum
        quod, doloribus quasi atque rem ratione ipsum quaerat a explicabo velit?
        Velit similique error pariatur earum consequatur doloremque at cumque?
      </Typography>
      <Button color='secondary' variant='outlined'>
        Sign Up
      </Button>
    </div>
  );

  const welcomeItems = [
    <img
      className={classes.displayImage}
      src='https://via.placeholder.com/635x512'
      alt='placeholder'
    />,
    <WelcomeCard />,
  ];

  const Foo = () => (
    <div className={classes.welcomeCard}>
      <div>
        <Typography variant='h4' component='h4'>
          The number one book store on this side of the equator
        </Typography>
      </div>
      <GridLayout
        // TODO this is kinda buggy needs a fix
        spacing={2}
        items={[
          <Typography variant='body2' component='p'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro quos
            doloribus dolorum quis labore?
          </Typography>,
          <Typography variant='body2' component='p'>
            Tempora tenetur delectus quibusdam cumque inventore a omnis maxime
            qui. Reprehenderit porro
          </Typography>,
        ]}
      />
    </div>
  );

  const secondCard = [
    <Foo />,
    <img
      className={classes.displayImage}
      src='https://via.placeholder.com/540x440'
      alt='placeholder'
    />,
  ];

  return (
    <div>
      <GridLayout
        items={welcomeItems}
        spacing={2}
        background={theme.palette.primary.main}
        reverseLayout={true}
      />
      <GridLayout
        items={secondCard}
        spacing={2}
        background={theme.palette.common.white}
        reverseLayout={true}
      />
    </div>
  );
}
