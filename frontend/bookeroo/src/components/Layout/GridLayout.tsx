import {
    makeStyles,
    Grid,
    Theme,
    GridSpacing,
    GridSize,
} from "@material-ui/core";
import { createStyles } from "@material-ui/styles";
import React from "react";

interface Props {
    items: React.ReactNode[]; // items to display in the grid
    size?: number[]; // optional sizing if wanting uneven grid - array of numbers should add up to 12
    spacing?: GridSpacing; // space between items
    reverseLayout?: boolean; // reverse layout when small screen
}
const useStyles = makeStyles((theme: Theme) => {
    const flexDirection = (props: Props) =>
        props.reverseLayout ? "column-reverse" : "column";
    return createStyles({
        root: {
            flexGrow: 1,
            paddingTop: theme.spacing(8),
            paddingBottom: theme.spacing(8),
        },
        gridContainer: {
            justifyContent: "space-evenly",
            alignItems: "center",
            [theme.breakpoints.down("xs")]: {
                flexDirection,
            }, // on small screens, reverse grid order to show text first
        },
    });
});

/**
 * Creates a customisable responsive grid layout to wrap children in
 * @param props view prop comments
 * @returns 
 */
export default function GridLayout(props: Props) {
    const classes = useStyles(props);
    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={props.spacing}
                className={classes.gridContainer}
            >
                {props.items.map((item, index, arr) => {
                    const size = props.size
                        ? props.size[index]
                        : 12 / arr.length;
                    return (
                        <Grid item sm={size as GridSize} key={index}>
                            {item}
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
}
