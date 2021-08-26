import {
    createStyles,
    Grid,
    Link,
    makeStyles,
    Paper,
    TextField,
    Theme,
} from "@material-ui/core";
import Button from "../components/Button/Button";
import { Form, Formik } from "formik";
import React from "react";
import FormCard from "../components/Form/FormCard";
import { Container } from "@material-ui/core";
import {
    Link as RouterLink,
    LinkProps as RouterLinkProps,
} from "react-router-dom";
import TextInput from "../components/Form/TextInput";

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
    const classes = useStyles();
    const fields = [
        "First Name",
        "Last Name",
        "Email",
        "Password",
        "Confirm Password",
    ];
    const form = (
        <form>
            <Grid container spacing={2}>
                {fields.map((field) => {
                    return (
                        <Grid item xs={12}>
                            <TextInput label={field} />
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
        <Button variant="contained" color="secondary">
            Sign Up
        </Button>,
    ];

    return (
        <Container className={classes.pageContainer}>
            <FormCard title="Sign Up" form={form} buttons={buttons} />
        </Container>
    );
}
