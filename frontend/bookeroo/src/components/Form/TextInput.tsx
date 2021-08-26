import {
    TextField,
    OutlinedTextFieldProps,
    createStyles,
    makeStyles,
    Theme,
} from "@material-ui/core";
import React from "react";
import { camelCase } from "../../util/stringManipulation";

interface Props extends Omit<OutlinedTextFieldProps, "variant"> {
    label: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        text: {
            background: theme.palette.common.white,
        },
    })
);
export default function TextInput(props: Props) {
    const classes = useStyles();
    const id = camelCase(props.label); // converts label into id
    return (
        <TextField
            className={classes.text}
            id={id}
            label={props.label}
            variant="outlined"
            color="secondary"
            fullWidth
        />
    );
}
