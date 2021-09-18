import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@material-ui/core";
import { profile } from "console";
import React from "react";
import { useQuery } from "react-query";
import { IListing } from "../api/models/Listing";
import { listListings } from "../api/stores/listing";

interface Props {
    userId: number;
}

export default function ProfileBooks(props: Props) {
    const { isLoading, data } = useQuery("listListings", () => listListings());
    console.log(data);

    const listings: IListing[] = data ? data.data : [];

    const userListings = listings.filter(
        (listing) => listing.userId === props.userId
    );

    // TODO add a book call to get book data for each listing

    const BookTable = () => {
        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Book</TableCell>
                            <TableCell align="right">Condition</TableCell>
                            <TableCell align="right">
                                Condition Description
                            </TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userListings.map((listing, key) => (
                            <TableRow key={key}>
                                <TableCell component="th" scope="row">
                                    {listing.id}
                                </TableCell>
                                <TableCell align="right">
                                    {listing.bookIsbn}
                                </TableCell>
                                <TableCell align="right">
                                    ${listing.condition}
                                </TableCell>
                                <TableCell align="right">
                                    ${listing.conditionDesc}
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

    return <BookTable />;
}
