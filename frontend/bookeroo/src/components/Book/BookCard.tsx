import React from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";
import { IBook } from "../../api/models/Book";
import Skeleton from "@material-ui/lab/Skeleton";
import { theme } from "../../styles/theme";
import { Paper } from "@material-ui/core";

interface IBookCard {
    book: IBook;
    loading: boolean;
}

const useStyles = makeStyles({
    root: {
        width: "16rem",
        background: "transparent",
        textAlign: "center",
    },
    media: {
        height: "16rem",
        backgroundColor: alpha(theme.palette.primary.dark, 0.2),
    },
});

/**
 *
 * @param props book to use in card, loading state of query
 * @returns Card that displays book information
 */
export default function BookCard(props: IBookCard) {
    const classes = useStyles();

    const Media = () =>
        props.loading ? (
            <Skeleton variant="rect" className={classes.media} />
        ) : (
            <Paper>
                <CardMedia
                    className={classes.media}
                    image={props.book.image}
                    title={props.book.title}
                />
            </Paper>
        );

    return (
        <Card className={classes.root} elevation={0}>
            <CardActionArea
                component={RouterLink}
                to={
                    props.loading
                        ? ""
                        : `book/${props.book.isbn || props.book.isbn13}`
                }
            >
                <Media />
                <CardContent>
                    <Typography gutterBottom variant="body1">
                        {props.loading ? (
                            <Skeleton variant="text" />
                        ) : (
                            props.book.title
                        )}
                    </Typography>

                    <Typography
                        variant="subtitle2"
                        color="textSecondary"
                        component="p"
                    >
                        {props.loading ? (
                            <Skeleton variant="text" />
                        ) : (
                            props.book.authors.split("|")[0]
                        )}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
