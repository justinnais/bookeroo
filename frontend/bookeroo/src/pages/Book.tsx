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
import Image from "../components/Layout/Image";
import { useQuery } from "react-query";
import Skeleton from "@material-ui/lab/Skeleton";
import BookTemplate from "../components/Book/BookTemplate";
import BookSkeleton from "../components/Book/BookSkeleton";

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
    const { isLoading, data } = useQuery(
        "getBooks",
        async () => await api.get(`/book/${isbn}`)
    );
    const { isbn } = useParams<{ isbn: string }>();

    let book = data ? (data.data as IBook) : undefined;

    // TODO fix skeleton
    return isLoading || !book ? <BookSkeleton /> : <BookTemplate book={book} />;
}
