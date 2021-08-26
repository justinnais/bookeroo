import {
    Container,
    createStyles,
    Grid,
    GridSize,
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
        textfield: {
            background: theme.palette.common.white,
        },
    })
);

export default function Login() {
    // TODO add formik and yup to actually make a form
    const classes = useStyles();

    const TextInput = (props: TextInputProps) => {
        return (
            <Grid item xs={props.gridItemSize as GridSize}>
                <TextField
                    id={props.id}
                    label={props.label}
                    variant="outlined"
                    color="secondary"
                    fullWidth
                />
            </Grid>
        );
    };

    const form = (
        <form>
            <Grid container spacing={2}>
                {/* <TextInput id='email' label='Email' gridItemSize={12} /> */}
                <Grid item xs={12}>
                    <TextField
                        className={classes.textfield}
                        id="email"
                        label="Email"
                        variant="outlined"
                        color="secondary"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        className={classes.textfield}
                        id="password"
                        label="Password"
                        variant="outlined"
                        color="secondary"
                        fullWidth
                    />
                </Grid>
            </Grid>
        </form>
    );

    const buttons = [
        // <NavigationButton text='Sign In' to='/login' />,
        <Button variant="contained" color="secondary">
            Sign In
        </Button>,
    ];
    return (
        <Container className={classes.pageContainer}>
            <FormCard title="Sign In" form={form} buttons={buttons} />
        </Container>
    );
}
