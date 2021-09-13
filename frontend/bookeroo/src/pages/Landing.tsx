import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import Image from "material-ui-image";
import { theme } from "../styles/theme";
import Button from "../components/Button/Button";
import GridLayout from "../components/Layout/GridLayout";
import TextCard from "../components/Layout/TextCard";
import Container from "../components/Layout/Container";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        displayImage: {
            width: "100%",
            height: "auto",
        },
    })
);

export default function Landing() {
    const classes = useStyles();

    const WelcomeCard = () => (
        <TextCard
            title="Bookeroo"
            titleSize="h2"
            pretitle="Welcome to"
            buttons={[
                <Button color="secondary" variant="outlined">
                    Sign Up
                </Button>,
            ]}
        >
            <Typography variant="body2" component="p">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Delectus cum quod, doloribus quasi atque rem ratione ipsum
                quaerat a explicabo velit? Velit similique error pariatur earum
                consequatur doloremque at cumque?
            </Typography>
        </TextCard>
    );

    const firstCard = [
        <img
            className={classes.displayImage}
            src="https://via.placeholder.com/635x512"
            alt="placeholder"
        />,
        <WelcomeCard />,
    ];

    const SecondTab = () => (
        <TextCard
            title="The number one book store on this side of the equator"
            titleSize="h4"
        >
            <GridLayout
                spacing={2}
                items={[
                    <Typography variant="body2" component="p">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Porro quos doloribus dolorum quis labore?
                    </Typography>,
                    <Typography variant="body2" component="p">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Porro quos doloribus dolorum quis labore?
                    </Typography>,
                ]}
            />
        </TextCard>
    );

    const secondCard = [
        <SecondTab />,
        <img
            className={classes.displayImage}
            src="https://via.placeholder.com/540x440"
            alt="placeholder"
        />,
    ];

    return (
        <div>
            <Container
                noMargin
                style={{ backgroundColor: theme.palette.primary.main }}
            >
                <GridLayout
                    items={firstCard}
                    size={[7, 5]}
                    spacing={2}
                    reverseLayout={true}
                />
            </Container>
            <Container
                noMargin
                style={{ backgroundColor: theme.palette.common.white }}
            >
                <GridLayout
                    items={secondCard}
                    spacing={2}
                    reverseLayout={false}
                />
            </Container>
        </div>
    );
}
