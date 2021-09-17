import {
    createStyles,
    Input,
    InputBase,
    makeStyles,
    TextField,
    Theme,
    Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { IBook } from "../api/models/Book";
import BookDisplay from "../components/Book/BookDisplay";
import Button from "../components/Button/Button";
import TextInput from "../components/Form/TextInput";
import Container from "../components/Layout/Container";
import Searchbar from "../components/Layout/Searchbar";
import TextCard from "../components/Layout/TextCard";
import { theme } from "../styles/theme";
import { useQuery } from "react-query";
import BookCard from "../components/Book/BookCard";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        jumbo: {
            // maxWidth: "50rem",
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
        text: {
            maxWidth: "40rem",
            marginBottom: theme.spacing(2),
        },
        searchbar: {
            display: "flex",
            flexDirection: "row",
            gap: theme.spacing(2),
            justifyContent: "center",
        },
    })
);

export default function Books() {
    const classes = useStyles();

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
                            <Button variant="contained" color="secondary">
                                Filter
                            </Button>
                        </div>
                    </TextCard>
                </div>
            </Container>
            <Container>
                <BookDisplay />
            </Container>
        </div>
    );
}
