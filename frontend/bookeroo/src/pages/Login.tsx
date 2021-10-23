import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { useState } from "react";
import FormCard from "../components/Form/FormCard";
import * as yup from "yup";
import FormGenerator, {
    GeneratedField,
} from "../components/Form/FormGenerator";
import SubmitButton from "../components/Button/SubmitButton";
import Container from "../components/Layout/Container";
import { getUser, loginUser } from "../api/stores/user";
import { IAccount, LoginAccountRequest } from "../api/models/Account";
import { useAlertStore } from "../stores/useAlertStore";
import { useHistory } from "react-router";
import storage from "../util/storage";
import jwt from "jsonwebtoken";
import { useAuthStore } from "../stores/useAuthStore";

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
    const history = useHistory();
    const formId = "loginForm";
    const setAlert = useAlertStore((state) => state.setAlert);
    const toast = (message: string) => {
        setAlert(message);
    };
    const login = useAuthStore((state) => state.login);
    // const toast = (message: string) => {
    //     setUser(message);
    // };
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
    const onSubmit = (values: any) => {
        const auth: LoginAccountRequest = {
            username: values.email,
            password: values.password,
        };

        loginUser(auth).then(
            (res) => handleResponse(res, auth),
            (err) => handleError(err)
        );
    };

    const handleResponse = (res: any, auth: LoginAccountRequest) => {
        if (res.status === 200) {
            storage.setToken(res.data.token);
            console.log("token decode", jwt.decode(res.data.token));
            const user = jwt.decode(res.data.token);
            login(user as IAccount);
            toast(`Successfully logged in ${auth.username}`);
            history.push("/"); // TODO push to user profile
        }
    };

    const handleError = (err: any) => {
        const error: { [key: string]: string } = err.response.data;
        // can be an object or string?
        console.log("error", error);

        if (typeof error === "string") {
            toast(error);
        } else {
            Object.values(error).map((error) => toast(error));
        }
    };
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
