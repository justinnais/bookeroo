import React from "react";
import InputBase from "@material-ui/core/InputBase";
import {
    createStyles,
    alpha,
    Theme,
    makeStyles,
} from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

// https://material-ui.com/components/app-bar/#app-bar-with-search-field

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        search: {
            position: "relative",
            marginLeft: 0,
            // width: "100%",
            border: "1px solid",
            borderColor: theme.palette.secondary.main,
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: "100%",
            position: "absolute",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        inputRoot: {
            color: "inherit",
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create("background", {
                duration: theme.transitions.duration.standard,
            }),
            // width: "100%",
            "&:hover": {
                background: alpha(theme.palette.primary.dark, 0.2),
            },
            "&:focus": {
                background: alpha(theme.palette.primary.dark, 0.2),
            },
        },
    })
);

export default function Searchbar() {
    const classes = useStyles();
    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
            />
        </div>
    );
}
