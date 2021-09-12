<<<<<<< HEAD
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
    import GridLayout, { IGridItem } from "../components/Layout/GridLayout";
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

        const contactCard: IGridItem[] = [
            {
                node: <ContactDetails />
            },

        ];

        return(
            <GridLayout
                items={contactCard}
                spacing = {2}
                background={theme.palette.common.white}
                reverseLayout={true}
            />

        );
    }
