import {
    Paper,
    List,
    ListItem,
    ListItemText,
    createStyles,
    makeStyles,
    Theme,
} from "@material-ui/core";
import React from "react";
interface Props {
    items: {
        label: string;
        value: string | number;
    }[];
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            height: "24rem",
        },
        details: {
            background: theme.palette.common.white,
        },
    })
);

/**
 * 
 * @param props array of items to display in list
 * @returns list
 */
export default function DetailsList(props: Props) {
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            <List className={classes.details}>
                {props.items.map((item, key) => (
                    <ListItem key={key}>
                        <ListItemText
                            primary={item.value}
                            secondary={item.label}
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}
