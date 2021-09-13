import {
    CircularProgress,
    createStyles,
    makeStyles,
    Theme,
} from "@material-ui/core";
import React, { useState } from "react";
import FormCard from "../components/Form/FormCard";
import Button from "../components/Button/Button";
import * as yup from "yup";
import FormGenerator, {
    GeneratedField,
} from "../components/Form/FormGenerator";
import SubmitButton from "../components/Button/SubmitButton";
import Container from "../components/Layout/Container";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        center: {
            display: "grid",
            placeItems: "center",
            minHeight: "50vh",
            // alignItems: "center",
            // justifyContent: "center",
            // flexDirection: "column",
        },
        link: {
            textAlign: "center",
        },
    })
);

export default function Login() {
    const [isSubmitting, setSubmitting] = useState(false);
    const classes = useStyles();
    const formId = "loginForm";
    const fields: GeneratedField[] = [
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
            schema: yup.string().required("Password is required"),
        },
    ];
    const onSubmit = (values: any) => console.table(values);
    const form = FormGenerator(formId, fields, onSubmit);
    const buttons = [
        <SubmitButton formId={formId} isSubmitting={isSubmitting}>
            Sign In
        </SubmitButton>,
    ];
    return (
        <Container>
            <div className={classes.center}>
                <FormCard title="Sign In" form={form} buttons={buttons} />
            </div>
        </Container>
    );
}

// TODO readd this in
//             <Grid item xs={12} className={classes.link}>
//                 <Link
//                     component={RouterLink}
//                     to="/register"
//                     color="textPrimary"
//                 >
//                     New? Create an account here
//                 </Link>
//             </Grid>
