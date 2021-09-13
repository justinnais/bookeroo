import {
    Typography,
    Button,
    createStyles,
    makeStyles,
    Theme,
    TypographyVariant,
} from "@material-ui/core";
import React, { ElementType } from "react";

interface Props {
    title?: string;
    titleSize?: string;
    pretitle?: string;
    subtitle?: string;
    // body?: string;
    buttons?: React.ReactNode[];
    children: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            height: "16rem",
            justifyContent: "space-between",
        },
    })
);

export default function TextCard(props: Props) {
    const classes = useStyles();
    return (
        <div className={classes.card}>
            <div>
                <Typography color="textSecondary" gutterBottom>
                    {props.pretitle}
                </Typography>

                <Typography
                    variant={props.titleSize as TypographyVariant}
                    component={props.titleSize as ElementType}
                >
                    {props.title}
                </Typography>

                <Typography color="textSecondary" gutterBottom>
                    {props.subtitle}
                </Typography>
            </div>
            {/* <Typography variant="body2" component="p">
                {props.body}
            </Typography> */}
            {props.children}
            {props.buttons &&
                props.buttons.map((button) => {
                    return button;
                })}
        </div>
    );
}
