import {
    Card,
    CardActions,
    CardContent,
    createStyles,
    makeStyles,
    Theme,
    Typography,
} from "@material-ui/core";
import React from "react";

interface Props {
    title: string;
    form: React.ReactNode;
    buttons: React.ReactNode[];
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "30rem",
            background: theme.palette.common.white,
        },
        content: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingRight: "2rem",
            paddingLeft: "2rem",
        },
        title: {
            textAlign: "center",
            marginBottom: "4rem",
        },
        form: {
            marginBottom: "2rem",
        },
        buttons: {
            justifyContent: "flex-end",
        },
    })
);

/**
 *
 * @param props title of card, form child and action buttons
 * @returns card that holds and styles a form, as well as any additional buttons
 */
export default function FormCard(props: Props) {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardContent className={classes.content}>
                <Typography
                    variant="h4"
                    component="h2"
                    className={classes.title}
                >
                    {props.title}
                </Typography>
                <div className={classes.form}>{props.form}</div>
                <CardActions className={classes.buttons}>
                    {props.buttons.map((button, key) => (
                        <div key={key}>{button}</div>
                    ))}
                </CardActions>
            </CardContent>
        </Card>
    );
}
