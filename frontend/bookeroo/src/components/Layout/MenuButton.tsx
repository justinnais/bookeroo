import {
    createStyles,
    IconButton,
    makeStyles,
    Menu,
    MenuItem,
    Theme,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {
    Link as RouterLink,
    LinkProps as RouterLinkProps,
} from "react-router-dom";

import React from "react";
import { Routes } from "../../routes/Routes";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        menuButton: {
            [theme.breakpoints.up("sm")]: { display: "none" }, // hide menu button on screens above small
        },
    })
);
/**
 * Menu button that displays on small screens, contains all links that would show on larger screens
 */
export default function MenuButton() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        // TODO add a close when window is resized to md
        setAnchorEl(null);
    };

    return (
        <div className={classes.menuButton}>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                aria-controls="menu-popup"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="menu-popup"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem
                    onClick={handleClose}
                    component={RouterLink}
                    to={Routes.Login}
                >
                    Sign In
                </MenuItem>
                <MenuItem
                    onClick={handleClose}
                    component={RouterLink}
                    to={Routes.Register}
                >
                    Sign Up
                </MenuItem>
            </Menu>
        </div>
    );
}
