import { createStyles, makeStyles, Theme, Toolbar } from "@material-ui/core";
import React from "react";
import Button from "../Button/Button";
import Container from "./Container";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: "absolute",
            bottom: 0,
            width: "100%",
            background: theme.palette.primary.main,
        },
        toolbar: {
            justifyContent: "flex-end", // spaces items at end of flexbox
        },
    })
);

/**
 *
 * @returns footer component at bottom of page
 */
export default function Footer() {
    const classes = useStyles();

    // can't use AppBar as it outputs a <header> which causes issues with footer positioning
    return (
        <div className={classes.root}>
            <Container noMargin>
                <Toolbar className={classes.toolbar} disableGutters>
                    <Button>Team</Button>
                    <Button to="/contact">Contact</Button>
                    <Button>Help</Button>
                </Toolbar>
            </Container>
        </div>
    );
}
