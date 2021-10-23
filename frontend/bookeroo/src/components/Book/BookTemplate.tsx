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
import {
    createListing,
    listBookListings,
    listListings,
} from "../../api/stores/listing";
import { createAuthorArray } from "../../util/createAuthorArray";
import DetailsList from "./DetailsList";
import GenericTable, { TableColumn } from "../Table/GenericTable";
import FormGenerator from "../Form/FormGenerator";
import CreateListingForm from "./CreateListingForm";
import { IListing } from "../../api/models/Listing";
import { getUser } from "../../api/stores/user";
import { IAccount } from "../../api/models/Account";
import ListTable from "./ListTable";
import Star from "../Rating/Star";
import { getReviewsForBook } from "../../api/stores/review";
import { useQuery } from "react-query";
import { listBookListings } from "../../api/stores/listing";
import Badge from "../Badge/Badge";
import { createTagsArray } from "../../util/createTagsArray";
import BadgeGroup from "../Badge/BadgeGroup";

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
    const [isSubmitting, setSubmitting] = useState(false);
    const authors = createAuthorArray(props.book.authors);
    const tags = createTagsArray(props.book.tags);
    const tableRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);

    const { isLoading, data } = useQuery(`getReviews-${props.book.isbn}`, () =>
        getReviewsForBook(props.book.isbn)
    );

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
                    Sell your copy
                </Button>,
            ]}
        >

            <Star isbn={props.book.isbn} />
            <BadgeGroup tags={tags} />
            <Typography variant="body2" component="div">
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

    const tocJSON = JSON.parse(props.book.tableOfContents);

    // this is scuffed
    const toc = Object.entries(tocJSON).map(
        (entry): { label: string; value: string } => ({
            label: entry[0],
            value: entry[1] as string,
        })
    );

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
        <DetailsList items={toc} />,

    ];

    const addToCartButton = (params: GridCellParams) => (
        <Button variant="contained" color="secondary">
            Add to cart
        </Button>
    );
    const { isLoading, data, refetch, isError } = useQuery(
        `listBookListings-${props.book.isbn}`,
        () => listBookListings(props.book.isbn)
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
                <ListTable isbn={props.book.isbn} />
                <CreateListingForm book={props.book} />
                <div ref={tableRef}>
                    <Typography variant="h4">Sellers</Typography>
                    <ListTable isLoading isError data={data} />
                </div>
                <div ref={formRef}>
                    <CreateListingForm book={props.book} />
                </div>
            </Container>
        </div>
    );
}
