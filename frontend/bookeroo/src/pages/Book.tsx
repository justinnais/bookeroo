import {
    makeStyles,
    Theme,
    createStyles,
    Button,
    Typography,
    List,
    ListItem,
    ListItemText,
} from "@material-ui/core";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import React from "react";
import Container from "../components/Layout/Container";
import GridLayout from "../components/Layout/GridLayout";
import TextCard from "../components/Layout/TextCard";
import { theme } from "../styles/theme";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        displayImage: {
            width: "100%",
            height: "auto",
        },
        icon: {
            // height: "100px",
            fontSize: 100,
        },
        details: {
            background: theme.palette.common.white,
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
            titleSize="h3"
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

    const details = (
        <List className={classes.details}>
            <ListItem>
                <ListItemText primary="1st" secondary="Edition" />
            </ListItem>
            <ListItem>
                <ListItemText primary="26 June 1997" secondary="Published" />
            </ListItem>
            <ListItem>
                <ListItemText primary="Bloomsberry" secondary="Publisher" />
            </ListItem>
            <ListItem>
                <ListItemText primary="0-7475-3269-9" secondary="ISBN" />
            </ListItem>
            <ListItem>
                <ListItemText primary="223" secondary="Page Count" />
            </ListItem>
        </List>
    );
    const quote = (
        <div>
            <FormatQuoteIcon className={classes.icon} />
            <Typography variant="h5">
                Est tation latine aliquip id, mea ad tale illud definitiones.
                Periculis omittantur necessitatibus eum ad, pro eripuit minimum
                comprehensam ne, usu cu stet prompta reformidans.
            </Typography>
            <Typography variant="subtitle1">John Smith</Typography>
        </div>
    );
    const secondCard = [quote, details];
    return (
        <div>
            <Container noMargin>
                <GridLayout items={firstCard} spacing={2} />
            </Container>
            <Container
                style={{ backgroundColor: theme.palette.primary.main }}
                noMargin
            >
                <GridLayout items={secondCard} size={[7, 5]} spacing={2} />
            </Container>
        </div>
    );
}
