import {
    Container,
    createStyles,
    Grid,
    GridSpacing,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
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
        topbar: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: theme.spacing(10),
        },
        root: {
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
        },
        link: {
            textAlign: "center",
        },
        UserDetails: {
            display: "flex",
            alignItems: "left",
            justifyContent: "left",
            flexDirection: "column",
        },
        BookDetails: {
            display: "flex",
            alignItems: "left",
            justifyContent: "left",
            flexDirection: "column",
            paddingTop: "1vh",
            paddingRight: "20vh",
        },
    })
);

export default function Profile() {
    const classes = useStyles();

    const UserDetails = () => (
        <div className={classes.UserDetails}>
            <div>
                <Typography variant="h4" component="h4">
                    Account Name
                </Typography>
                <Typography variant="body2" component="p">
                    User Rating 4.65
                </Typography>
            </div>
        </div>
    );

    const BookTable = () => {
        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="right">Condtion</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Harry Potter and the Philosopher's Stone
                            </TableCell>
                            <TableCell align="right">Lightly Used</TableCell>
                            <TableCell align="right">$23.00</TableCell>
                            <TableCell align="right">
                                <Button variant="contained" color="secondary">
                                    Add to cart
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                The Great Gatbsy
                            </TableCell>
                            <TableCell align="right">Well Worn</TableCell>
                            <TableCell align="right">$16.00</TableCell>
                            <TableCell align="right">
                                <Button variant="contained" color="secondary">
                                    Add to cart
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                    {/* <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">
                                    {row.calories}
                                </TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">
                                    {row.protein}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody> */}
                </Table>
            </TableContainer>
        );
    };

    return (
        <Container className={classes.root}>
            <div className={classes.topbar}>
                <UserDetails />
                <Button color="secondary" variant="outlined">
                    Recent Orders
                </Button>
            </div>
            <Typography variant="h5" component="h5">
                Books For Sale
            </Typography>
            <BookTable />
        </Container>
    );
}
