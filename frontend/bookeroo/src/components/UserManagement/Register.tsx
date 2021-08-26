import { Box, createStyles, makeStyles, Paper, TextField, Theme } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            background: theme.palette.primary.main,
        },
    })
);

export default function Register() {
    const classes = useStyles();

    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Paper elevation={0} className={classes.root}>
                <Formik
                    initialValues={{

                    }}
                    validate={(values) => {
                        
                    }}
                    onSubmit={(values, { setSubmitting }) => {

                    }}
                >
                    {(
                        <Form>
                            <Box>
                                <TextField
                                    variant="outlined"
                                    name="fname"
                                    type="text"
                                    label="First name"
                                />
                            </Box>
                            <Box>
                                <TextField
                                    variant="outlined"
                                    name="lname"
                                    type="text"
                                    label="Last name"
                                />
                            </Box>
                            <Box>
                                <TextField
                                    variant="outlined"
                                    name="email"
                                    type="text"
                                    label="Email"
                                />
                            </Box>
                            <Box>
                                <TextField
                                    variant="outlined"
                                    name="password"
                                    type="password"
                                    label="Password"
                                />
                            </Box>
                            <Box>
                                <TextField
                                    variant="outlined"
                                    name="confPassword"
                                    type="password"
                                    label="Confirm Password"
                                />
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Box>
    )
}