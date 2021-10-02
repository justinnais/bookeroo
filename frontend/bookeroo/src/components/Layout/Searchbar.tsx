import React, { useEffect, useRef, useState } from "react";
import InputBase from "@material-ui/core/InputBase";
import {
    createStyles,
    alpha,
    Theme,
    makeStyles,
} from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import SubmitButton from "../Button/SubmitButton";
import { Redirect, useHistory } from "react-router-dom";
import { useSearchParams } from "../../pages/Search";

// https://material-ui.com/components/app-bar/#app-bar-with-search-field

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            background: theme.palette.primary.main,
            gap: theme.spacing(2),
        },
        search: {
            position: "relative",
            marginLeft: 0,
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
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create("background", {
                duration: theme.transitions.duration.standard,
            }),
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
    const history = useHistory();
    const [query, setQuery] = useState(useSearchParams().get("q"));

    const handleSubmit = (
        event:
            | React.FormEvent<HTMLFormElement>
            | React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();
        history.push(`search?q=${query}`);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    // setting input ref as autofocus on inputbase doesn't work
    const inputRef = useRef<HTMLInputElement>();
    useEffect(() => inputRef.current && inputRef.current.focus());

    return (
        <form
            className={classes.root}
            onSubmit={(event) => handleSubmit(event)}
            id="searchForm"
        >
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
                    value={query || ""}
                    onChange={handleChange}
                    inputRef={inputRef}
                />
            </div>
            <SubmitButton formId="searchForm" isSubmitting={false}>
                Search
            </SubmitButton>
        </form>
    );
}
