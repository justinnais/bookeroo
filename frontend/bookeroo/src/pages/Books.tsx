import {
    createStyles,
    Input,
    InputBase,
    makeStyles,
    TextField,
    Theme,
    Typography,
} from "@material-ui/core";
import React from "react";
import BookCard from "../components/Book/BookCard";
import BookDisplay from "../components/Book/BookDisplay";
import Button from "../components/Button/Button";
import TextInput from "../components/Form/TextInput";
import Container from "../components/Layout/Container";
import Searchbar from "../components/Layout/Searchbar";
import TextCard from "../components/Layout/TextCard";
import { theme } from "../styles/theme";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        jumbo: {
            // maxWidth: "50rem",
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
        text: {
            maxWidth: "40rem",
        },
        searchbar: {
            display: "flex",
            flexDirection: "row",
            gap: theme.spacing(2),
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create("width"),
            width: "100%",
            [theme.breakpoints.up("md")]: {
                width: "20ch",
            },
        },
    })
);

export default function Books() {
    const classes = useStyles();

    const books = [
        {
            title: "Harry Potter and the Philosopher's Stone",
            author: "J. K. Rowling.",
            image: "https://via.placeholder.com/200x200",
        },
        {
            title: "The Great Gatbsy",
            author: "F. Scott Fitzgerald",
            image: "https://via.placeholder.com/400x600",
        },
        {
            title: "Harry Potter and the Philosopher's Stone",
            author: "J. K. Rowling.",
            image: "https://via.placeholder.com/200x200",
        },
        {
            title: "The Great Gatbsy",
            author: "F. Scott Fitzgerald",
            image: "https://via.placeholder.com/400x600",
        },
        {
            title: "Harry Potter and the Philosopher's Stone",
            author: "J. K. Rowling.",
            image: "https://via.placeholder.com/200x200",
        },
        {
            title: "The Great Gatbsy",
            author: "F. Scott Fitzgerald",
            image: "https://via.placeholder.com/400x600",
        },
        {
            title: "Harry Potter and the Philosopher's Stone",
            author: "J. K. Rowling.",
            image: "https://via.placeholder.com/200x200",
        },
        {
            title: "The Great Gatbsy",
            author: "F. Scott Fitzgerald",
            image: "https://via.placeholder.com/400x600",
        },
        {
            title: "Harry Potter and the Philosopher's Stone",
            author: "J. K. Rowling.",
            image: "https://via.placeholder.com/200x200",
        },
        {
            title: "The Great Gatbsy",
            author: "F. Scott Fitzgerald",
            image: "https://via.placeholder.com/400x600",
        },
        {
            title: "Harry Potter and the Philosopher's Stone",
            author: "J. K. Rowling.",
            image: "https://via.placeholder.com/200x200",
        },
        {
            title: "The Great Gatbsy",
            author: "F. Scott Fitzgerald",
            image: "https://via.placeholder.com/400x600",
        },
    ];
    return (
        <div>
            <Container
                noMargin
                style={{ backgroundColor: theme.palette.primary.main }}
            >
                <div className={classes.jumbo}>
                    <TextCard
                        title="Our latest books"
                        titleSize="h3"
                        align="center"
                    >
                        <Typography
                            variant="body2"
                            component="p"
                            className={classes.text}
                        >
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Delectus cum quod, doloribus quasi atque rem
                            ratione ipsum quaerat a explicabo velit? Velit
                            similique error pariatur earum consequatur
                            doloremque at cumque?
                        </Typography>
                        <div className={classes.searchbar}>
                            <Searchbar />
                            {/* <TextField
                                variant="outlined"
                                color="secondary"
                                placeholder="Search"
                            /> */}
                            <Button variant="contained" color="secondary">
                                Filter
                            </Button>
                        </div>
                    </TextCard>
                </div>
            </Container>
            <Container>
                <BookDisplay books={books} />
            </Container>
        </div>
    );
}
