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
            marginTop: (props: Props) =>
                props.noMargin ? theme.spacing(0) : theme.spacing(12),
            marginBottom: (props: Props) =>
                props.noMargin ? theme.spacing(0) : theme.spacing(12),
        },
    })
);

export default function Container(props: Props) {
    const classes = useStyles(props);

    return (
        <div style={props.style}>
            <ContainerMU className={classes.root}>{props.children}</ContainerMU>
        </div>
    );
}
