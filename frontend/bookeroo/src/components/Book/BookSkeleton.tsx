import {
    makeStyles,
    Theme,
    createStyles,
    Button,
    Typography,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { parse } from "path";
import React from "react";
import TextCard from "../Layout/TextCard";

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

export default function BookSkeleton() {
    // TODO create skeleton for book
    const classes = useStyles();

    // const firstCard = [
    //     <Skeleton variant="rect" />,
    //     <TextCard
    //         titleSize="h3"
    //         subtitle={"this is authors"}
    //         // subtitle={props.book.authors.split("|").join(" - ")}
    //         buttons={[
    //             <Button color="secondary" variant="contained">
    //                 View Sellers
    //             </Button>,
    //             <Button color="secondary" variant="outlined">
    //                 Add to wishlist
    //             </Button>,
    //         ]}
    //     >
    //         <Typography variant="body2" component="p">
    //         </Typography>
    //     </TextCard>,
    // ];

    return <div>loading</div>;
}
