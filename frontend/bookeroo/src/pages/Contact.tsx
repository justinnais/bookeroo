
    import {
        Container,
        createStyles,
        Grid,
        GridSpacing,
        makeStyles,
        Paper,
        Theme,
        Typography,
    } from "@material-ui/core";
    import { ThemeProvider } from "@material-ui/styles";
    import React from "react";
    import { Link } from "react-router-dom";
    import ReactDOM from "react-dom";
    import GridLayout from "../components/Layout/GridLayout";
    import { theme } from "../styles/theme";

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            link: {
                textAlign: "center",
            },
            ContactDetails: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                paddingTop: "15vh",
            },
        })
    );

    export default function Contact() {
        const classes = useStyles();

        const ContactDetails = () => (
            <div className={classes.ContactDetails}>
                <Typography variant="h4" component="h4">
                    Contact Details
                </Typography>

                <Typography variant="body2" component="p">
                    Open: 9am-5pm
                </Typography>

                <Typography variant="body2" component="p">
                    Ph: 0412345789
                </Typography>

                <Typography variant="body2" component="p">
                    Email: bookeroo@help.bookeroo.com
                </Typography>
            </div>
        );

        return (
            <Container style={{ backgroundColor: theme.palette.common.white }}>
                <GridLayout
                    items={[<ContactDetails />]}
                    spacing={2}
                    reverseLayout={true}
                />
            </Container>
        );
    }
