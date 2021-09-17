import React, { useState } from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";
import { Routes } from "../../routes/Routes";
import { IBook } from "../../api/models/Book";
import Skeleton from "@material-ui/lab/Skeleton";
import Logo from "../../assets/image.svg";
import { theme } from "../../styles/theme";
const useStyles = makeStyles({
    root: {
        width: "16rem",
        background: "transparent",
        textAlign: "center",
        maxHeight: "24rem", // TODO not sure about this
    },
    media: {
        height: "16rem",
        backgroundColor: alpha(theme.palette.primary.dark, 0.2),
    },
});
export default function BookCard(book: IBook, loading: boolean) {
    const classes = useStyles();
    const authors = book.authors.split("|");

    const Media = () =>
        loading ? (
            <Skeleton variant="rect" className={classes.media} />
        ) : (
            <CardMedia
                className={classes.media}
                image={book.image}
                title={book.title}
            />
        );

    return (
        <Card className={classes.root}>
            <CardActionArea
                component={RouterLink}
                to={`book/${book.isbn || book.isbn13}`}
            >
                <Media />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                        {loading ? <Skeleton variant="text" /> : book.title}
                    </Typography>

                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {loading ? <Skeleton variant="text" /> : authors[0]}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
