import {
    Button as ButtonMU,
    ButtonProps,
    createStyles,
    makeStyles,
    Theme,
} from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

interface Props extends ButtonProps {
    children?: React.ReactNode;
    to?: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            textTransform: "capitalize",
            minWidth: "5rem",
        },
    })
);

/**
 * Button component that extends a regular button
 * @param props optional link string, and MUI button props
 * @returns Button
 */
export default function Button(props: Props) {
    const classes = useStyles();

    return (
        <ButtonMU
            color="inherit"
            // component={props.to ? RouterLink : ButtonMU}
            href={props.to ? props.to : undefined}
            {...props}
            className={classes.button}
        >
            <div>{props.children}</div>
            
        </ButtonMU>
    );
}
