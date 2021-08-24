import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Box, TextField } from '@material-ui/core';
import { StringNullableChain } from 'lodash';

interface TextInputProps {
    name: string;
    label: string;
}

const TextInput = (props: TextInputProps) => (
    <Box>
        <Field
            component={TextField}
            name={props.name}
            label={props.label}
        />
    </Box>

);

export default function Register() {
    return (
        <div>
            <Formik
                initialValues={{

                }}
                validate={(values) => {
                    // const errors: Partial<Values> = {};
                }}
                onSubmit={(values, { setSubmitting }) => {

                }}
            >
                {({ submitForm, isSubmitting, touched, errors }) => (
                    <Form>
                        <TextInput
                            name="username"
                            label="Username"
                        />
                        <TextInput
                            name="email"
                            label="Email"
                        />
                        <TextInput
                            name="fname"
                            label="First Name"
                        />
                        <TextInput
                            name="sname"
                            label="Surname"
                        />
                        <Box>
                            <Field
                                component={TextField}
                                name="pass"
                                type="password"
                                label="Password"
                            />
                        </Box>
                        <Box>
                            <Field
                                component={TextField}
                                name="confpass"
                                type="password"
                                label="Confirm Password"
                            />
                        </Box>
                    </Form>
                )}
            </Formik>
        </div>
    )
}