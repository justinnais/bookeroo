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
    align?: "center" | "right";
}

const useStyles = makeStyles((theme: Theme) => {
    const textAlign = (props: Props) => {
        switch (props.align) {
            case "center":
                return "center";
            case "right":
                return "right";
            default:
                return "left";
        }
    };
    const alignItems = (props: Props) => {
        switch (props.align) {
            case "center":
                return "center";
            case "right":
                return "flex-end";
            default:
                return "flex-start";
        }
    };

    return createStyles({
        root: {
            display: "flex",
            flexDirection: "column",
            alignItems,
            height: "16rem",
            justifyContent: "space-between",
            textAlign,
        },
    });
});

export default function TextCard(props: Props) {
    const classes = useStyles(props);
    return (
        <div className={classes.root}>
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
