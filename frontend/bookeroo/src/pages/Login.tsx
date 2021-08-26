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
import React from "react";
import FormCard from "../components/Form/FormCard";
import Formik from "formik";
import { theme } from "../styles/theme";
import Button from "../components/Button/Button";
import TextInput from "../components/Form/TextInput";
import {
    Link as RouterLink,
    LinkProps as RouterLinkProps,
} from "react-router-dom";

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
    // TODO add formik and yup to actually make a form
    const classes = useStyles();
    const fields = ["Email", "Password"];

    const form = (
        <form>
            <Grid container spacing={2}>
                {fields.map((field, key) => {
                    return (
                        <Grid item xs={12} key={key}>
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
                        New? Create an account here
                    </Link>
                </Grid>
            </Grid>
        </form>
    );

    const buttons = [
        // <NavigationButton text='Sign In' to='/login' />,
        <Button variant="contained" color="secondary" disableElevation>
            Sign In
        </Button>,
    ];
    return (
        <Container className={classes.pageContainer}>
            <FormCard title="Sign In" form={form} buttons={buttons} />
        </Container>
    );
}
