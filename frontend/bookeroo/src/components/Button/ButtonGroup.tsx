import {
    createStyles,
    Grid,
    GridProps,
    GridSpacing,
    makeStyles,
    Theme,
} from "@material-ui/core";
import React from "react";

interface Props extends GridProps {
    children: React.ReactNode[];
    spacing?: GridSpacing;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
    })
);

export default function ButtonGroup(props: Props) {
    const classes = useStyles();
    return (
        <Grid
            container
            spacing={props.spacing}
            className={classes.root}
            {...props}
        >
            {props.children.map((button, i) => {
                return (
                    <Grid item key={i}>
                        {button}
                    </Grid>
                );
            })}
        </Grid>
    );
}
