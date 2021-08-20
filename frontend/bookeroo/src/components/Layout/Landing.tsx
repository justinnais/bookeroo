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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      background: theme.palette.primary.main,
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    displayImage: {
      width: '100%',
      height: 'auto',
    },
    control: {
      padding: theme.spacing(2),
    },
    welcomeCard: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      height: '16rem',
      justifyContent: 'space-between',
    },
    gridContainer: {
      justifyContent: 'space-evenly',
      alignItems: 'center',
      [theme.breakpoints.down('xs')]: { flexDirection: 'column-reverse' }, // on small screens, reverse grid order to show text first
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

        <Typography variant='h3' component='h2'>
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

  return (
    <div className={classes.root}>
      <Container>
        <Grid container spacing={2} className={classes.gridContainer}>
          <Grid item sm={6}>
            <img
              className={classes.displayImage}
              src='https://via.placeholder.com/635x512'
              alt='placeholder'
            />
            {/* // TODO fix image not working with responsive grid*/}
            {/* <Image
                src='https://via.placeholder.com/635x512'
                alt='placeholder'
                color={theme.palette.primary.main}
              /> */}
          </Grid>
          <Grid item sm={6}>
            <WelcomeCard />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
