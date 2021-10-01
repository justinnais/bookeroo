import {
    TextField,
    OutlinedTextFieldProps,
    createStyles,
    makeStyles,
    Theme,
    TextFieldProps,
} from "@material-ui/core";
import { Formik, FormikProps } from "formik";
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
    errors?: { [key: string]: string }; // TODO this could be better - maybe only pass error for this field
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        text: {
            // background: theme.palette.primary.main,
            // minHeight: "4rem", // allows for error field without pushing other fields
        },
    })
);

export default function TextInput(props: Props) {
    const classes = useStyles();
    const id = camelCase(props.label); // converts label into id

    // TODO fix this validation as the error will show but then not reset on change
    // find a matching id in errors, and display that in helper text
    // Object.entries(props.errors || {}).find(([key, value]) => {
    //     if (key === id) {
    //         console.log("matching", id, value);
    //         props.formik.errors[key] = value;
    //     }
    // });

    const helperText = props.formik.touched[id] && props.formik.errors[id];
    const error = !!props.formik.touched[id] && !!props.formik.errors[id];

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
            // size="small"
            {...props.formik.getFieldProps(id)}
        />
    );
}
