import {
    Container,
    createStyles,
    makeStyles,
    Theme,
    Typography,
} from "@material-ui/core";
import React from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button/Button";
import { IBook } from "../api/models/Book";
import { editUser, getProfile, getUser, listUsers } from "../api/stores/user";
import { useQuery } from "react-query";
import { IAccount } from "../api/models/Account";
import { Skeleton } from "@material-ui/lab";
import { AccountStatus } from "../util/enums";
import { useAuthStore } from "../stores/useAuthStore";
import OrderTable from "../components/Profile/OrderTable";
import { listListings } from "../api/stores/listing";
import ListTable from "../components/Table/ListTable";
import { IListing } from "../api/models/Listing";
import Star from "../components/Rating/Star";
import UserRating from "../components/Rating/UserRating";

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

export function convertDate(date: number) {
    return new Date(date).toDateString();
}

export default function Profile() {
    const classes = useStyles();
    const isAdmin = useAuthStore((state) => state.isAdmin);
    const user = useAuthStore((state) => state.user);
    const { displayName } = useParams<{ displayName: string }>();
    const { isLoading, data, isError } = useQuery("getProfile", () =>
        getProfile(displayName)
    );
    const {
        isLoading: listLoading,
        isError: listError,
        data: listData,
    } = useQuery("listListings", () => listListings());

    if (isError) {
        return (
            <Container className={classes.root}>
                <div className={classes.topbar}>
                    <Typography variant="h4" component="h4">
                        There was an issue loading this profile. Please try
                        again.
                    </Typography>
                </div>
            </Container>
        );
    }

    const profile: IAccount = data ? data.data : undefined;

    const isOwnAccount =
        user && profile ? profile.id.toString() === user.id.toString() : false;

    const UserDetails = () => (
        <div className={classes.userDetails}>
            <div>
                <Typography variant="h5" component="h5">
                    {isLoading ? (
                        <Skeleton variant="text" width={200} />
                    ) : (
                        profile.displayName
                    )}
                </Typography>
                <Typography variant="body2" component="p">
                    {isLoading ? (
                        <Skeleton variant="text" width={150} />
                    ) : (
                        `Member since ${convertDate(profile.dateCreated)}`
                    )}
                </Typography>
                <Typography variant="body2" component="p">
                    {isLoading ? (
                        <Skeleton variant="text" width={100} />
                    ) : (
                        <UserRating userId={profile.id} />
                    )}
                </Typography>
            </div>
        </div>
    );

    return (
        <Container className={classes.root}>
            <div className={classes.topbar}>
                <UserDetails />
            </div>
            {isLoading ? (
                <div>
                    <Typography variant="h5" component="h5" gutterBottom>
                        <Skeleton variant="text" width={200} />
                    </Typography>
                    <Skeleton variant="rect" height={400} />
                </div>
            ) : (
                <div>
                    <Typography variant="h5" component="h5" gutterBottom>
                        Books For Sale
                    </Typography>
                    <ListTable
                        isLoading={listLoading}
                        isError={listError}
                        data={listData}
                        filter={(data: IListing[]) =>
                            data.filter(
                                (listing: IListing) =>
                                    listing.userId.toString() ===
                                    profile.id.toString()
                            )
                        }
                    />
                </div>
            )}

            {isOwnAccount && (
                <div>
                    <Typography variant="h5" component="h5" gutterBottom>
                        My Orders
                    </Typography>
                    <OrderTable buyerId={profile.id} />
                </div>
            )}
        </Container>
    );
}
