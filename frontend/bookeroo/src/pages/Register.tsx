import {
    CircularProgress,
    createStyles,
    makeStyles,
    Theme,
} from "@material-ui/core";
import Button from "../components/Button/Button";
import React, { useState } from "react";
import FormCard from "../components/Form/FormCard";
import * as yup from "yup";
import { AccountType } from "../util/enums";
import FormGenerator, {
    GeneratedField,
} from "../components/Form/FormGenerator";
import Container from "../components/Layout/Container";
import { registerUser } from "../api/stores/user";
import { CreateAccountRequest } from "../api/models/Account";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        center: {
            display: "grid",
            placeItems: "center",
            minHeight: "50vh",
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
            label: "Display Name",
            type: "text",
            schema: yup.string().required("Display Name is required"),
        },
        {
            label: "First Name",
            type: "text",
            schema: yup.string().required("First Name is required"),
        },
        {
            label: "Last Name",
            type: "text",
            schema: yup.string().required("Last Name is required"),
        },
        {
            label: "Email",
            type: "email",
            schema: yup
                .string()
                .email("Email must be a valid email")
                .required("Email is required"),
        },
        {
            label: "Password",
            type: "password",
            schema: yup
                .string()
                .required("Password is required")
                .min(6, "Password is too short"),
        },
        {
            label: "Confirm Password",
            type: "password",
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
            const { email, confirmPassword, ...other } = values; // omits confirmPassword and email from values
            console.table(values);

            const request: CreateAccountRequest = {
                ...other,
                username: values.email,
                accountType: AccountType.STANDARD,
            };
            const response = registerUser(request);
            console.table(response);
        }
        setSubmitting(false);
    };
    const form = FormGenerator("registerForm", fields, onSubmit);

    const buttons = [
        <Button
            variant="contained"
            color="secondary"
            form="registerForm"
            disabled={isSubmitting}
            type="submit"
        >
            {isSubmitting ? <CircularProgress /> : "Sign Up"}
        </Button>,
    ];

    return (
        <Container>
            <div className={classes.center}>
                <FormCard title="Sign Up" form={form} buttons={buttons} />
            </div>
        </Container>
    );
}
