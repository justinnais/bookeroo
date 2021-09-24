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
import {
    DataGrid,
    GridCellParams,
    GridColDef,
    GridValueGetterParams,
} from "@material-ui/data-grid";
import { useParams } from "react-router";
import parse from "html-react-parser";
import { useQuery } from "react-query";
import { IBook } from "../../api/models/Book";
import { theme } from "../../styles/theme";
import GridLayout from "../Layout/GridLayout";
import TextCard from "../Layout/TextCard";
import Image from "../Layout/Image";
import Container from "../Layout/Container";
import { listBookListings, listListings } from "../../api/stores/listing";
import { createAuthorArray } from "../../util/createAuthorArray";
import DetailsList from "./DetailsList";

interface Props {
    book: IBook;
}

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
        quote: {
            maxWidth: "50vw",
        },
    })
);

export default function BookTemplate(props: Props) {
    const classes = useStyles();
    const { isLoading, data } = useQuery("listBookListings", () =>
        listBookListings(props.book.isbn || props.book.isbn)
    );

    const authors = createAuthorArray(props.book.authors);

    const firstCard = [
        <TextCard
            title={props.book.title}
            titleSize="h4"
            subtitle={authors.join(", ")}
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
                {props.book.synopsys && parse(props.book.synopsys)}
            </Typography>
        </TextCard>,
        <Image src={props.book.image} alt="placeholder" />,
    ];

    const firstList = [
        { label: "Edition", value: props.book.edition },
        { label: "Published", value: props.book.datePublished },
        { label: "Publisher", value: props.book.publisher },
        { label: "ISBN", value: props.book.isbn || props.book.isbn13 },
        { label: "Page Count", value: props.book.pages },
    ];

    const quote = (
        <div className={classes.quote}>
            <FormatQuoteIcon className={classes.icon} />
            <Typography variant="h5">
                Est tation latine aliquip id, mea ad tale illud definitiones.
                Periculis omittantur necessitatibus eum ad, pro eripuit minimum
                comprehensam ne, usu cu stet prompta reformidans.
            </Typography>
            <Typography variant="subtitle1">John Smith</Typography>
        </div>
    );

    const secondCard = [
        quote,
        <DetailsList items={firstList} />,
        <DetailsList items={firstList} />,
    ];

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
                <GridLayout items={firstCard} spacing={2} size={[7, 5]} />
            </Container>
            <Container
                style={{ backgroundColor: theme.palette.primary.main }}
                noMargin
            >
                <GridLayout items={secondCard} spacing={2} />
            </Container>
            <Container>
                <Typography variant="h4">Sellers</Typography>
                {table}
            </Container>
        </div>
    );
}
