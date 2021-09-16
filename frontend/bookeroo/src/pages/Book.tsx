import {
    makeStyles,
    Theme,
    createStyles,
    Button,
    Typography,
    List,
    ListItem,
    ListItemText,
    Paper,
} from "@material-ui/core";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import React, { useEffect, useState } from "react";
import Container from "../components/Layout/Container";
import GridLayout from "../components/Layout/GridLayout";
import TextCard from "../components/Layout/TextCard";
import { theme } from "../styles/theme";
import {
    DataGrid,
    GridCellParams,
    GridColDef,
    GridValueGetterParams,
} from "@material-ui/data-grid";
import SellerTable from "../components/SellerTable";
import { api } from "../api/api";
import { IBook } from "../api/models/Book";
import { useParams } from "react-router";
import parse from "html-react-parser";
import Image from "../components/Image";

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

export default function Book() {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [book, setBook] = useState<IBook>();
    const { isbn } = useParams<{ isbn: string }>();
    const getBook = async () => {
        const { data } = await api.get(`/book/${isbn}`);
        setBook(data);
    };
    useEffect(() => {
        getBook().finally(() => setLoading(false));
    }, []);

    if (!book) {
        return <div>no book</div>;
    }
    const authors = book.authors.split("|");
    const firstCard = [
        <Image src={book.image} alt="placeholder" />,
        <TextCard
            title={book.title}
            titleSize="h3"
            subtitle={authors.join(" - ")}
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
                {book.synopsys && parse(book.synopsys)}
            </Typography>
        </TextCard>,
    ];

    const details = (
        <List className={classes.details}>
            <ListItem>
                <ListItemText primary={book.edition} secondary="Edition" />
            </ListItem>
            <ListItem>
                <ListItemText
                    primary={book.datePublished}
                    secondary="Published"
                />
            </ListItem>
            <ListItem>
                <ListItemText primary={book.publisher} secondary="Publisher" />
            </ListItem>
            <ListItem>
                <ListItemText
                    primary={book.isbn || book.isbn13}
                    secondary="ISBN"
                />
            </ListItem>
            <ListItem>
                <ListItemText primary={book.pages} secondary="Page Count" />
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

    const addToCartButton = (params: GridCellParams) => (
        <Button variant="contained" color="secondary">
            Add to cart
        </Button>
    );

    // TODO this needs to be turned into its own component, maybe better to use regular table instead of data grid
    // https://material-ui.com/components/tables/#table
    const columns: GridColDef[] = [
        { field: "id", headerName: "ID" },
        {
            field: "sellerName",
            headerName: "Seller",
            minWidth: 200,
        },
        {
            field: "condition",
            headerName: "Condition",
            minWidth: 200,
        },
        {
            field: "price",
            headerName: "Price",
            type: "number",
            minWidth: 150,
        },
        {
            field: "button",
            headerName: "",
            minWidth: 200,
            align: "right",
            renderCell: addToCartButton,
        },
    ];

    const rows = [
        { id: 1, sellerName: "Jon", price: 35, condition: "Good" },
        { id: 2, sellerName: "Cersei", price: 42, condition: "Good" },
        { id: 3, sellerName: "Jaime", price: 45, condition: "Good" },
        { id: 4, sellerName: "Arya", price: 16, condition: "Good" },
        { id: 5, sellerName: "Daenerys", price: null, condition: "Good" },
        { id: 6, sellerName: null, price: 150, condition: "Good" },
        { id: 7, sellerName: "Ferrara", price: 44, condition: "Good" },
        { id: 8, sellerName: "Rossini", price: 36, condition: "Good" },
        { id: 9, sellerName: "Harvey", price: 65, condition: "Good" },
    ];

    const table = (
        <div style={{ height: 400, width: "100%" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                disableSelectionOnClick
            />
        </div>
    );
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
            <Container>
                <Typography variant="h4">Sellers</Typography>
                {table}
            </Container>
        </div>
    );
}