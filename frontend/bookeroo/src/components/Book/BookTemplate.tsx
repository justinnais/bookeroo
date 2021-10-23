import {
    makeStyles,
    Theme,
    createStyles,
    Button,
    Typography,
} from "@material-ui/core";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import React, { useRef } from "react";
import parse from "html-react-parser";
import { useQuery } from "react-query";
import { IBook } from "../../api/models/Book";
import { theme } from "../../styles/theme";
import GridLayout from "../Layout/GridLayout";
import TextCard from "../Layout/TextCard";
import Image from "../Layout/Image";
import Container from "../Layout/Container";
import { listBookListings } from "../../api/stores/listing";
import { createAuthorArray } from "../../util/createAuthorArray";
import DetailsList from "./DetailsList";
import CreateListingForm from "./CreateListingForm";
import { createTagsArray } from "../../util/createTagsArray";
import BadgeGroup from "../Badge/BadgeGroup";
import ListTable from "../Table/ListTable";
import BookRatings from "../Rating/BookRatings";

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
            fontSize: 100,
        },
        details: {
            background: theme.palette.common.white,
        },
        quote: {
            maxWidth: "50vw",
        },
        form: {
            display: "flex",
            justifyContent: "center",
        },
    })
);

/**
 * 
 * @param props book being displayed on page
 * @returns renders the book information and sellers
 */
export default function BookTemplate(props: Props) {
    const classes = useStyles();
    const authors = createAuthorArray(props.book.authors);
    const tags = createTagsArray(props.book.tags);
    const tableRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);

    const { isLoading, data, refetch, isError } = useQuery(
        `listBookListings-${props.book.isbn}`,
        () => listBookListings(props.book.isbn)
    );

    function scrollToRef(ref: React.RefObject<HTMLDivElement>) {
        if (ref.current) {
            ref.current.scrollIntoView();
        }
    }

    const firstCard = [
        <TextCard
            title={props.book.title}
            titleSize="h4"
            subtitle={authors.join(", ")}
            buttons={[
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => scrollToRef(tableRef)}
                >
                    View Sellers
                </Button>,
                <Button
                    color="secondary"
                    variant="outlined"
                    onClick={() => scrollToRef(formRef)}
                >
                    Sell your copy
                </Button>,
            ]}
        >
            <BookRatings isbn={props.book.isbn} />
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
        <DetailsList items={toc} />,
    ];

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
                <div ref={tableRef}>
                    <Typography variant="h4" gutterBottom>
                        Sellers
                    </Typography>
                    <ListTable
                        isLoading={isLoading}
                        isError={isError}
                        data={data}
                    />
                </div>
                <div ref={formRef} className={classes.form}>
                    <CreateListingForm book={props.book} />
                </div>
            </Container>
        </div>
    );
}
