import {
    makeStyles,
    Theme,
    createStyles,
    Button,
    Typography,
} from "@material-ui/core";
import React from "react";
import GridLayout from "../components/Layout/GridLayout";
import TextCard from "../components/Layout/TextCard";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        displayImage: {
            width: "100%",
            height: "auto",
        },
    })
);

interface Props {
    title: string;
    author: string;
    description: string;
}

export default function Book(props: Props) {
    const classes = useStyles();

    const firstCard = [
        <img
            className={classes.displayImage}
            src="https://via.placeholder.com/540x440"
            alt="placeholder"
        />,
        <TextCard
            title={props.title}
            titleSize="h2"
            subtitle={props.author}
            buttons={[
                <Button color="secondary" variant="contained">
                    View Sellers
                </Button>,
                <Button color="secondary" variant="outlined">
                    Add to wishlist
                </Button>,
            ]}
        >
            <Typography variant="body2" component="p">
                {props.description}
            </Typography>
        </TextCard>,
    ];
    return (
        <div>
            <GridLayout items={firstCard} />
        </div>
    );
}
