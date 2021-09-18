import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Collapse,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
    Link as RouterLink,
    LinkProps as RouterLinkProps,
    useHistory,
} from "react-router-dom";
import Button from "../Button/Button";
import ButtonGroup from "../Button/ButtonGroup";
import MenuButton from "./MenuButton";
import { Routes } from "../../routes/Routes";
import { useAlertStore } from "../../stores/useAlertStore";
import Searchbar from "./Searchbar";
import { useFormik } from "formik";
import SubmitButton from "../Button/SubmitButton";

/**
 * This is the component styling - we use this to create classes that apply only to things in this component
 * If you need to create global styles, they go in App.scss
 * If you want to change part of the MaterialUI theme, edit the theme.tsx
 */
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            boxShadow: "none", // removes shadow from navbar
            //   color: theme.palette.secondary.main, // sets text colour to main accent colour
        },
        toolbar: {
            justifyContent: "space-between", // spaces items in navbar apart from each other
        },
        menuButton: {
            [theme.breakpoints.up("sm")]: { display: "none" }, // hide menu button on screens above small
        },
        navButtons: {
            "& *": {
                textTransform: "capitalize",
            },
            [theme.breakpoints.down("xs")]: { display: "none" }, // hide nav button on screens below xs
        },
        logo: {
            textTransform: "uppercase",
            color: theme.palette.secondary.main,
            textDecoration: "inherit",
        },
    })
);

/**
 * Header component located at top of web page
 */
export default function Header() {
    const classes = useStyles();
    const [showSearch, setShowSearch] = useState(false);

    const toggleSearch = () => setShowSearch(!showSearch);

    /**
     * Navigation links that show on large screens
     */
    // TODO center buttons correctly
    const NavButtons = () => (
        <>
            <div className={classes.navButtons}>
                <Button onClick={toggleSearch}>Search</Button>
                <Button to={Routes.Books}>Books</Button>
                <Button>Sell Books</Button>
            </div>
            <div className={classes.navButtons}>
                <Button to="/login">Sign In</Button>
                <Button variant="contained" color="secondary" to="/register">
                    Sign Up
                </Button>
            </div>
        </>
    );

    const Logo = () => (
        <Typography
            variant="h6"
            className={classes.logo}
            component={RouterLink}
            to="/"
        >
            Bookeroo
        </Typography>
    );
    /**
     * This is what is rendered by the component, we can see that it has the AppBar and Toolbar,
     * which contain the Logo, NavButtons and MenuButton components we created above
     */
    return (
        <div>
            <AppBar position="static" className={classes.root}>
                <Container>
                    <Toolbar className={classes.toolbar} disableGutters>
                        <Logo />
                        {/* <MiddleNavButtons /> */}
                        <NavButtons />
                        <MenuButton />
                    </Toolbar>
                </Container>
            </AppBar>
            <Searchbar />

            {/* <Collapse in={showSearch}>
            </Collapse> */}
        </div>
    );
}
