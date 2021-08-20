import {
  makeStyles,
  Container,
  Grid,
  Theme,
  GridSpacing,
  GridSize,
} from '@material-ui/core';
import { PaletteColor } from '@material-ui/core/styles/createPalette';
import { createStyles } from '@material-ui/styles';
import React from 'react';

interface Props {
  items: React.ReactNode[];
  spacing?: GridSpacing;
  background?: string;
  reverseLayout?: boolean;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      background: (props: Props) => props.background,
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    gridContainer: {
      justifyContent: 'space-evenly',
      alignItems: 'center',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column-reverse',
      }, // on small screens, reverse grid order to show text first
      // TODO get this working with conditional props.reverseLayout
    },
  })
);

export default function GridLayout(props: Props) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Container>
        <Grid
          container
          spacing={props.spacing}
          className={classes.gridContainer}
        >
          {props.items.map((item, index, arr) => {
            return (
              <Grid item sm={(12 / arr.length) as GridSize}>
                {item}
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

// TODO maybe need a prop for sm={6} on line 45
