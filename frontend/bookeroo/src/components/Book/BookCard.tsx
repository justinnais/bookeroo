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
import Skeleton from "@material-ui/lab/Skeleton";
import Logo from "../../assets/image.svg";
import { theme } from "../../styles/theme";
export interface IBookCard {
    title: string;
    author: string;
    image?: string;
    loading?: boolean;
}

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
export default function BookCard(props: IBookCard) {
    const classes = useStyles();

    const Media = () =>
        props.loading ? (
            <Skeleton variant="rect" className={classes.media} />
        ) : (
            <CardMedia
                className={classes.media}
                image={props.image || Logo}
                title={props.title}
            />
        );

    return (
        <Card className={classes.root} elevation={0}>
            <CardActionArea
                component={RouterLink}
                to={Routes.Book}
                style={{ minHeight: "24rem" }}
            >
                <Media />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                        {props.loading ? (
                            <Skeleton variant="text" />
                        ) : (
                            props.title
                        )}
                    </Typography>

                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {props.loading ? (
                            <Skeleton variant="text" />
                        ) : (
                            props.author
                        )}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
