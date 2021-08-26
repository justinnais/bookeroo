import {
    Container,
    createStyles,
    Grid,
    GridSize,
    Link,
    makeStyles,
    OutlinedTextFieldProps,
    TextField,
    Theme,
} from "@material-ui/core";
import React, { useState } from "react";
import FormCard from "../components/Form/FormCard";
import Formik, { useFormik } from "formik";
import { theme } from "../styles/theme";
import Button from "../components/Button/Button";
import TextInput, { Field } from "../components/Form/TextInput";
import {
    Link as RouterLink,
    LinkProps as RouterLinkProps,
} from "react-router-dom";
import * as yup from "yup";
import { camelCase } from "../util/stringManipulation";
import { string } from "yup/lib/locale";

interface TextInputProps extends OutlinedTextFieldProps {
    gridItemSize: number;
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

export default function Login() {
    const [isSubmitting, setSubmitting] = useState(false);
    const classes = useStyles();
    // const fields = ["Email", "Password"];
    const fields: Field[] = [
        { label: "Email", type: "email" },
        { label: "Password", type: "password" },
    ];

    // convert fields into initial values
    let initialValues: { [key: string]: string } = {};
    fields.forEach((field) => {
        initialValues[camelCase(field.label)] = "";
    });

    const validationSchema = yup.object().shape({
        email: yup.string().email().required("Email is required"),
        password: yup.string().required("Password is required"),
    });
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            console.table(values);
        },
    });
    const form = (
        <form onSubmit={formik.handleSubmit} id="login">
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
                        to="/register"
                        color="textPrimary"
                    >
                        New? Create an account here
                    </Link>
                </Grid>
            </Grid>
        </form>
    );

    const buttons = [
        <Button
            variant="contained"
            color="secondary"
            type="submit"
            form="login"
        >
            Sign In
        </Button>,
    ];
    return (
        <Container className={classes.pageContainer}>
            <FormCard title="Sign In" form={form} buttons={buttons} />
        </Container>
    );
}
