<<<<<<< HEAD
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
import { theme } from "../styles/theme";
import Button from "../components/Button/Button";

// TODO this is just temp interface
export interface Book {
    title: string;
    condtion: string;
    price: string;
}

interface Props {
    name: string;
    rating: string;
    books: Book[];
}

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
        userDetails: {
            display: "flex",
            alignItems: "left",
            justifyContent: "left",
            flexDirection: "column",
        },
    })
);

export default function Profile(props: Props) {
    const classes = useStyles();

    const UserDetails = () => (
        <div className={classes.userDetails}>
            <div>
                <Typography variant="h4" component="h4">
                    {props.name}
                </Typography>
                <Typography variant="body2" component="p">
                    {props.rating} Rating
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
                        {props.books.map((book, key) => (
                            <TableRow key={key}>
                                <TableCell component="th" scope="row">
                                    {book.title}
                                </TableCell>
                                <TableCell align="right">
                                    {book.condtion}
                                </TableCell>
                                <TableCell align="right">
                                    ${book.price}
                                </TableCell>
                                <TableCell align="right">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Add to cart
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
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
