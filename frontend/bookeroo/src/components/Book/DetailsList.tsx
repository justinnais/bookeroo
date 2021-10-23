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
        details: {
            background: theme.palette.common.white,
        },
        paper: {
            minHeight: "24rem",
        },
    })
);
export default function DetailsList(props: Props) {
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            <List className={classes.details}>
                {props.items.map((item) => (
                    <ListItem>
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
