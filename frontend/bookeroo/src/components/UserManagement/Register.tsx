import { Box, Button, createStyles, makeStyles, Paper, TextField, Theme } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            background: theme.palette.primary.main
        },
        textField: {
            backgroundColor: 'white'
        },
    })
);

export default function Register() {
    const classes = useStyles();

    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Paper elevation={0} className={classes.root}>
                <h1>Sign Up</h1>
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
                            <Box margin>
                                <TextField
                                    variant="outlined"
                                    name="fname"
                                    type="text"
                                    label="First name"
                                    className={classes.textField}
                                />
                            </Box>
                            <Box margin>
                                <TextField
                                    variant="outlined"
                                    name="lname"
                                    type="text"
                                    label="Last name"
                                    className={classes.textField}
                                />
                            </Box>
                            <Box margin>
                                <TextField
                                    variant="outlined"
                                    name="email"
                                    type="text"
                                    label="Email"
                                    className={classes.textField}
                                />
                            </Box>
                            <Box margin>
                                <TextField
                                    variant="outlined"
                                    name="password"
                                    type="password"
                                    label="Password"
                                    className={classes.textField}
                                />
                            </Box>
                            <Box margin>
                                <TextField
                                    variant="outlined"
                                    name="confPassword"
                                    type="password"
                                    label="Confirm Password"
                                    className={classes.textField}
                                />
                            </Box>
                            <a href="/">Publisher or Store Owner?</a>
                            <Box>
                                <Button
                                    variant="contained"
                                    disableElevation
                                    color="secondary"
                                    name="submit"
                                    type="submit"
                                >
                                    Sign Up
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Box>
    )
}