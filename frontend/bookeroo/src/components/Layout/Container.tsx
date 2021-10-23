import {
    Container as ContainerMU,
    ContainerProps,
    createStyles,
    makeStyles,
    Theme,
} from "@material-ui/core";
import React from "react";

interface Props extends ContainerProps {
    children: NonNullable<React.ReactNode>;
    noMargin?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingTop: (props: Props) =>
                props.noMargin ? theme.spacing(0) : theme.spacing(8),
            paddingBottom: (props: Props) =>
                props.noMargin ? theme.spacing(0) : theme.spacing(8),
        },
    })
);

/**
 * Container wrapper to keep items in eyeline
 * @param props children for container
 * @returns 
 */
export default function Container(props: Props) {
    const classes = useStyles(props);

    return (
        <div style={props.style}>
            <ContainerMU className={classes.root}>{props.children}</ContainerMU>
        </div>
    );
}
