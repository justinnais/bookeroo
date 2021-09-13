import {
    makeStyles,
    Grid,
    Theme,
    GridSpacing,
    GridSize,
} from "@material-ui/core";
import { createStyles } from "@material-ui/styles";
import React from "react";

export interface IGridItem {
    size?: number;
    node: React.ReactNode;
}
interface Props {
    items: IGridItem[];
    // items: IGridItem[] | React.ReactNode[];
    spacing?: GridSpacing;
    reverseLayout?: boolean;
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            paddingTop: theme.spacing(8),
            paddingBottom: theme.spacing(8),
        },
        gridContainer: {
            justifyContent: "space-evenly",
            alignItems: "center",
            [theme.breakpoints.down("xs")]: {
                flexDirection: "column-reverse",
            }, // on small screens, reverse grid order to show text first
            // TODO get this working with conditional props.reverseLayout
        },
    })
);

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
                    const size = item.size ? item.size : 12 / arr.length;
                    return (
                        <Grid item sm={size as GridSize}>
                            {item.node}
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
}
