import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import React from 'react';

interface Props {
  title: string;
  form: React.ReactNode;
  buttons: React.ReactNode[]; //this should only be buttons fix later
}
export default function FormCard(props: Props) {
  return (
    <Card>
      <CardContent>
        <Typography variant='h5' component='h2'>
          {props.title}
        </Typography>
        {props.form}
      </CardContent>
      <CardActions>{props.buttons.map((button) => button)}</CardActions>
    </Card>
  );
}
