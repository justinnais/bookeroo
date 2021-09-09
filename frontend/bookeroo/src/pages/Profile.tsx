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
    import Button from "../components/Button/Button";

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            link: {
                 textAlign: "center",
            },
            UserDetails: {
                 display: "flex",
                 alignItems: "left",
                 justifyContent: "left",
                 flexDirection: "column",
                 paddingTop: "7vh",
            },
            OrderButton: {
               display: "flex",
               alignItems: "right",
               justifyContent: "right",
               flexDirection: "column",
               paddingTop: "7vh",
            },
            BookDetails: {
                display: "flex",
                alignItems: "left",
                justifyContent: "left",
                flexDirection: "column",
                paddingTop: "1vh",
                paddingRight: "20vh",
            },
            SellingItems: {
                  display: "inline-block",
                  alignItems: "left",
                  justifyContent: "center",
                  flexDirection: "column",
                  paddingTop: "1vh",
            },
        })
    );


    export default function Profile() {
        const classes = useStyles();

        const UserDetails = () => (
            <div className = {classes.UserDetails}>
                <div>
                    <Typography variant="h4" component="h4">
                        Account Name
                    </Typography>
                    <Typography variant="body2" component="p">
                        User Rating
                    </Typography>
                </div>
            </div>
        );

        const OrderButton = () => (
            <>
                <div className = {classes.OrderButton}>
                    <Button color="secondary" variant="outlined">
                        Recent Orders
                    </Button>
                </div>
            </>
        );

        const introItems: IGridItem[] = [
            {
                node: <UserDetails />
            },
            {
                node: <OrderButton />
            },
        ];

        const BookDetails = () => (
            <div className =  {classes.BookDetails}>
                <Typography variant="h5" component="h5">
                     Books For Sale
                </Typography>
            </div>

        );

        const Selling = () => (
               // will need to be updated later

                <table>
                    <caption>
                         <Typography variant="h5" component="h5">
                                             Books For Sale
                                        </Typography>
                    </caption>
                    <div className = {classes.SellingItems}>
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Condition</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <td>Harry Potter and the Philosopher's Stone</td>
                                        <td>Lightly Used</td>
                                        <td>$23.00</td>
                                    </tbody>
                    </div>
                </table>

        );

        const sellingItems: IGridItem[] = [
                    {
                        node: <Selling />
                    },
        ];

        return(
            <div>
                   <GridLayout
                        items={introItems}
                        spacing={1}
                        background={theme.palette.common.white}
                        reverseLayout={true}
                   />
                   <GridLayout
                         items={sellingItems}
                         spacing={1}
                         background={theme.palette.common.white}
                         reverseLayout={true}
                   />
             </div>
        );

    }
