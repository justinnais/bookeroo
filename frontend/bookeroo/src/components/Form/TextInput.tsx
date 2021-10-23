import {
    TextField,
    OutlinedTextFieldProps,
    createStyles,
    makeStyles,
    Theme,
    TextFieldProps,
} from "@material-ui/core";
import React from "react";
import { camelCase } from "../../util/stringManipulation";

interface Props extends Omit<OutlinedTextFieldProps, "variant"> {
    label: string;
    type?: "text" | "email" | "password" | "number";
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

/**
 *
 * @param props label, type of text input, formik props
 * @returns validated text input
 */
export default function TextInput(props: Props) {
    const id = camelCase(props.label); // converts label into id
    const helperText = props.formik.touched[id] && props.formik.errors[id];
    const error = !!props.formik.touched[id] && !!props.formik.errors[id];

    return (
        <TextField
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
