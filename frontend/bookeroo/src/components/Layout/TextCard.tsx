import {
    Typography,
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
            justifyContent: "space-between",
            textAlign,
        },
        buttons: {
            display: "flex",
            gap: theme.spacing(2),
            flexDirection: "row",
        },
        children: {
            marginBottom: theme.spacing(6),
        },
    });
});

/**
 * Generic text card to format and style text consistently
 * @param props text and other options to display in card
 * @returns card to display text
 */
export default function TextCard(props: Props) {
    const classes = useStyles(props);
    return (
        <div className={classes.root}>
            <div>
                <Typography color="textSecondary" variant="subtitle1">
                    {props.pretitle}
                </Typography>

                <Typography
                    variant={props.titleSize as TypographyVariant}
                    component={props.titleSize as ElementType}
                >
                    {props.title}
                </Typography>

                <Typography color="textSecondary" variant="subtitle1">
                    {props.subtitle}
                </Typography>
            </div>
            <div className={classes.children}>{props.children}</div>
            <div className={classes.buttons}>
                {props.buttons &&
                    props.buttons.map((button, key) => {
                        return <div key={key}>{button}</div>; // todo check this extra div doesn't break things
                    })}
            </div>
        </div>
    );
}
