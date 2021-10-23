import { Skeleton } from "@material-ui/lab";
import React from "react";
import Container from "../Layout/Container";

/**
 *
 * @returns skeleton loading for book page
 */
export default function BookSkeleton() {
    return (
        <Container>
            <Skeleton variant="rect" width={400} />
            <Skeleton variant="text" width={200} />
            <Skeleton variant="rect" width={300} />
            <Skeleton variant="text" width={200} />
            <Skeleton variant="text" width={200} />
        </Container>
    );
}
