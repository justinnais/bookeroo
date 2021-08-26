import {
    CircularProgress,
    createStyles,
    Grid,
    Link,
    makeStyles,
    Paper,
    TextField,
    Theme,
} from "@material-ui/core";
import Button from "../components/Button/Button";
import { Form, Formik, useFormik } from "formik";
import React, { useState } from "react";
import FormCard from "../components/Form/FormCard";
import { Container } from "@material-ui/core";
import {
    Link as RouterLink,
    LinkProps as RouterLinkProps,
} from "react-router-dom";
import TextInput, { Field } from "../components/Form/TextInput";
import { camelCase } from "../util/stringManipulation";
import * as yup from "yup";
import { API } from "../api/api";
import { CreateAccountRequest } from "../api/account";
import { AccountType } from "../util/enums";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        pageContainer: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            paddingTop: "15vh",
        },
        link: {
            textAlign: "center",
        },
    })
);

export default function Register() {
    const [isSubmitting, setSubmitting] = useState(false);
    const classes = useStyles();
    const fields: Field[] = [
        { label: "First Name", type: "text" },
        { label: "Last Name", type: "text" },
        { label: "Email", type: "email" },
        { label: "Password", type: "password" },
        { label: "Confirm Password", type: "password" },
    ];

    // convert fields into initial values
    let initialValues: { [key: string]: string } = {};
    fields.forEach((field) => {
        initialValues[camelCase(field.label)] = "";
    });

    const validationSchema = yup.object().shape({
        firstName: yup.string().required("First Name is required"),
        lastName: yup.string().required("Last Name is required"),
        email: yup
            .string()
            .email("Email must be a valid email")
            .required("Email is required"),
        password: yup.string().required("Password is required"),
        // .min(8, 'Password is too short'), // todo uncomment after testing and add regex
        confirmPassword: yup
            .string()
            .required("Please confirm password")
            .oneOf([yup.ref("password"), null], "Passwords must match"),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        /**
         * On submit, set submitting to true so form goes into loading state,
         * then converts form values into an Account before storing in local storage
         *  - change to API later
         * @param values user entered values in the form
         */
        onSubmit: (values) => {
            setSubmitting(true);

            let duplicate = false;
            // TODO check database for existing accounts with email
            if (duplicate) {
                // if exists, global alert error
            } else {
                const { confirmPassword, ...other } = values; // omits confirmPassword from values
                console.table(values);
                // const request: CreateAccountRequest = {
                //     ...other,
                //     accountType: AccountType.STANDARD,
                //     type: "register",
                // };
                // const response = API.post("register", request);

                // setAccounts({ ...accounts, [accountId]: formValues });

                // props.alertCb
                //     ? props.alertCb(
                //           `Successfully created account for ${formValues.email}`,
                //           "success"
                //       )
                //     : undefined;

                // history.push("/login");
            }
            setSubmitting(false);
        },
    });

    const form = (
        <form onSubmit={formik.handleSubmit} id="register">
            <Grid container spacing={2}>
                {fields.map((field, key) => {
                    return (
                        <Grid item xs={12} key={key}>
                            <TextInput field={field} formik={formik} />
                        </Grid>
                    );
                })}
                <Grid item xs={12} className={classes.link}>
                    <Link
                        component={RouterLink}
                        to="/login"
                        color="textPrimary"
                    >
                        Already have an account? Log In
                    </Link>
                </Grid>
            </Grid>
        </form>
    );

    const buttons = [
        <Button
            variant="contained"
            color="secondary"
            form="register"
            disabled={isSubmitting}
            type='submit'
        >
            {isSubmitting ? <CircularProgress /> : "Sign Up"}
        </Button>,
    ];

    return (
        <Container className={classes.pageContainer}>
            <FormCard title="Sign Up" form={form} buttons={buttons} />
        </Container>
    );
}
