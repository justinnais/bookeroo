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

function approveAccount(id: number) {
    console.log("approve");
    editUser(id, AccountStatus.OK);
}
function denyAccount(id: number) {
    editUser(id, AccountStatus.REJECTED);
}

export default function Profile() {
    const classes = useStyles();
    const isAdmin = useAuthStore((state) => state.isAdmin);
    const user = useAuthStore((state) => state.user);
    const { displayName } = useParams<{ displayName: string }>();
    const { isLoading, data } = useQuery("getProfile", () =>
        getProfile(displayName)
    );
    console.log(data);

    const profile: IAccount = data ? data.data : undefined;
    // TODO add error handling to this page when no user found
    const isPending = profile
        ? profile.accountStatus === AccountStatus.PENDING
        : false;

    const isOwnAccount = user && profile ? profile.id === user.id : false;

    console.log("isPending", isPending, isAdmin);
    const UserDetails = () => (
        <div className={classes.userDetails}>
            <div>
                <Typography variant="h4" component="h4">
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
                        <div>
                            Member since {convertDate(profile.dateCreated)}
                        </div>
                    )}
                </Typography>
                <Typography variant="body2" component="p">
                    Rating TODO
                </Typography>
            </div>
        </div>
    );

    return (
        <Container className={classes.root}>
            <div className={classes.topbar}>
                <UserDetails />
                <div>
                    {isOwnAccount && (
                        <Button color="secondary" variant="outlined">
                            Recent Orders
                        </Button>
                    )}

                    {isPending && isAdmin ? (
                        <div>
                            <Button
                                color="secondary"
                                variant="contained"
                                onClick={() =>
                                    approveAccount(
                                        profile ? profile.id : 999999
                                    )
                                }
                            >
                                Approve
                            </Button>
                            <Button
                                color="secondary"
                                variant="outlined"
                                onClick={() =>
                                    denyAccount(profile ? profile.id : 999999)
                                }
                            >
                                Deny
                            </Button>
                        </div>
                    ) : null}
                </div>
            </div>
            <Typography variant="h5" component="h5">
                Books For Sale
            </Typography>
            {isLoading ? (
                <Skeleton variant="rect" height={400} />
            ) : (
                <div>add a filtered table of listings based on user id</div>
                // <ProfileBooks userId={profile.id} />
            )}
        </Container>
    );
}
