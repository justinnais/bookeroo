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
import TextInput from "../components/Form/TextInput";
import { camelCase } from "../util/stringManipulation";
import * as yup from "yup";
import { post } from "../api/api";
import { CreateAccountRequest } from "../api/microservices/user";
import { AccountType } from "../util/enums";
import FormGenerator, {
    GeneratedField,
} from "../components/Form/FormGenerator";

interface RegisterForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

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
    const fields: GeneratedField[] = [
        {
            label: "First Name",
            type: "text",
            initialValue: "",
            schema: yup.string().required("First Name is required"),
        },
        {
            label: "Last Name",
            type: "text",
            initialValue: "",
            schema: yup.string().required("Last Name is required"),
        },
        {
            label: "Email",
            type: "email",
            initialValue: "",
            schema: yup
                .string()
                .email("Email must be a valid email")
                .required("Email is required"),
        },
        {
            label: "Password",
            type: "password",
            initialValue: "",
            schema: yup.string().required("Password is required"),
            // .min(8, 'Password is too short'), // todo uncomment after testing and add regex,
        },
        {
            label: "Confirm Password",
            type: "password",
            initialValue: "",
            schema: yup
                .string()
                .required("Please confirm password")
                .oneOf([yup.ref("password"), null], "Passwords must match"),
        },
    ];

    const onSubmit = (values: any) => {
        setSubmitting(true);
        let duplicate = false;
        // TODO check database for existing accounts with email
        if (duplicate) {
            // if exists, global alert error
        } else {
            const { confirmPassword, ...other } = values; // omits confirmPassword from values
            console.table(values);

            const request: CreateAccountRequest = {
                ...other,
                type: "user/register",
                accountType: AccountType.STANDARD,
            };
            const response = post(request);
            console.table(response);
        }
        setSubmitting(false);
    };
    const form = FormGenerator(fields, onSubmit, "registerForm");

    const buttons = [
        <Button
            variant="contained"
            color="secondary"
            form="register"
            disabled={isSubmitting}
            type="submit"
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
