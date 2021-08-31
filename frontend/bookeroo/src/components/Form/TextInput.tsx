import {
    TextField,
    OutlinedTextFieldProps,
    createStyles,
    makeStyles,
    Theme,
    TextFieldProps,
} from "@material-ui/core";
import { FormikProps } from "formik";
import React from "react";
import { camelCase } from "../../util/stringManipulation";

interface Props extends Omit<OutlinedTextFieldProps, "variant"> {
    label: string;
    type?: "text" | "email" | "password";
    formik: {
        touched: { [x: string]: any };
        errors: {
            [x: string]:
                | boolean
                | React.ReactChild
                | React.ReactFragment
                | React.ReactPortal
                | null
                | undefined;
        };
        getFieldProps: (
            arg0: string
        ) => JSX.IntrinsicAttributes & TextFieldProps;
    };
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        text: {
            // background: theme.palette.common.white,
        },
    })
);
export default function TextInput(props: Props) {
    const classes = useStyles();
    const id = camelCase(props.label); // converts label into id
    const error = !!props.formik.touched[id] && !!props.formik.errors[id];
    const helperText = props.formik.touched[id] && props.formik.errors[id];
    return (
        <TextField
            className={classes.text}
            id={id}
            label={props.label}
            type={props.type ? props.type : "text"}
            variant="outlined"
            color="secondary"
            fullWidth
            error={error}
            helperText={helperText}
            {...props.formik.getFieldProps(id)}
        />
    );
}
