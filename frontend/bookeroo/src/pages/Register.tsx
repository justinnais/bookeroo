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

declare module "yup" {
    interface ArraySchema<T> {
        unique(mapper: (a: T) => T, message?: any): ArraySchema<T>;
    }
}

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

// TODO add unique property errors
// https://github.com/jquense/yup/issues/345
/* yup.addMethod(
    yup.array,
    "unique",
    function (
        mapper = (a: any) => a,
        message: string = "${path} may not have duplicates"
    ) {
        return this.test("unique", message, (list) => {
            return list
                ? list.length === new Set(list.map(mapper)).size
                : false;
        });
    }
); */

export default function Register() {
    const foo = [{ displayName: "foo" }, { displayName: "test" }];
    const [isSubmitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const classes = useStyles();
    const fields: GeneratedField[] = [
        {
            label: "Display Name",
            type: "text",
            schema: yup
                .string()
                // .array()
                // .of(yup.string())
                .required("Display Name is required"),
            // .unique((foo) => foo, "duplicate name"),
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
            const request: CreateAccountRequest = {
                ...other,
                username: values.email,
                accountType: AccountType.STANDARD,
            };
            registerUser(request).then(
                (res) => handleResponse(res),
                (err) => {
                    console.log("response errors", err.response.data);

                    setErrors(err.response.data);
                }
            );
        }
        setSubmitting(false);
    };

    const handleResponse = (res: any) => {
        setErrors({});
        console.log("success", res);
    };

    const form = FormGenerator("registerForm", fields, onSubmit, errors);
    console.log(errors);

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
