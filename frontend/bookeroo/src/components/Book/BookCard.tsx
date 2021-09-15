import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles({
    root: {
        width: "16rem",
    },
    media: {
        height: "16rem",
    },
});
export default function BookCard(book: IBook) {
    const classes = useStyles();
    const authors = book.authors.split("|");

    // TODO card action area not extending
    return (
        <Card className={classes.root}>
            <CardActionArea
                component={RouterLink}
                to={`book/${book.isbn || book.isbn13}`}
            >
                <CardMedia
                    className={classes.media}
                    image={book.image}
                    title={book.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {book.title}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {authors[0]}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
