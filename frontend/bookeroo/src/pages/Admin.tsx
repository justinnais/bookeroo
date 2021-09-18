import {
    createStyles,
    Divider,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Theme,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import { useQuery } from "react-query";
import { listUsers } from "../api/stores/user";
import Container from "../components/Layout/Container";
import TextCard from "../components/Layout/TextCard";
import { theme } from "../styles/theme";
import { IAccount } from "../api/models/Account";
import { Link as RouterLink } from "react-router-dom";
import { convertDate } from "./Profile";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            display: "grid",
            gridTemplateColumns: "1fr minmax(150px, 20%)",
        },
        list: {
            background: theme.palette.primary.main,
        },
        tableRow: {
            textDecoration: "none",
        },
    })
);

export default function Admin() {
    const classes = useStyles();
    const { isLoading, data } = useQuery("listUsers", listUsers);
    const users = data ? (data.data as IAccount[]) : [];
    const listItems = [
        {
            label: "Pending accounts",
            link: console.log("update this"),
        },
        {
            label: "Account management",
            link: console.log("update this"),
        },
        {
            label: "Book management",
            link: console.log("update this"),
        },
        {
            label: "Generate user report",
            link: console.log("update this"),
        },
        {
            label: "Generate transaction report",
            link: console.log("update this"),
        },
        {
            label: "View logs",
            link: console.log("update this"),
        },
    ];

    const SkeletonRow = () => (
        <TableRow>
            <Skeleton variant="rect" />
        </TableRow>
    );

    const UserTable = () => (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Display Name</TableCell>
                        <TableCell align="right">First Name</TableCell>
                        <TableCell align="right">Last Name</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Date Created</TableCell>
                        <TableCell align="right">Last Updated</TableCell>
                        <TableCell align="right">Account Type</TableCell>
                        <TableCell align="right">Account Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isLoading ? (
                        <SkeletonRow />
                    ) : (
                        users.map((user) => (
                            <TableRow
                                key={user.id}
                                component={RouterLink}
                                to={`/user/${user.displayName}`}
                                hover
                                className={classes.tableRow}
                            >
                                <TableCell component="th" scope="row">
                                    {user.id}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {user.displayName}
                                </TableCell>
                                <TableCell align="right">
                                    {user.firstName}
                                </TableCell>
                                <TableCell align="right">
                                    {user.lastName}
                                </TableCell>
                                <TableCell align="right">
                                    {user.username}
                                </TableCell>
                                <TableCell align="right">
                                    {convertDate(user.dateCreated)}
                                </TableCell>
                                <TableCell align="right">
                                    {user.lastUpdated
                                        ? convertDate(user.lastUpdated)
                                        : "-"}
                                </TableCell>
                                <TableCell align="right">
                                    {user.accountType}
                                </TableCell>
                                <TableCell align="right">
                                    {user.accountStatus}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );

    return (
        <div>
            <Container
                style={{ background: theme.palette.primary.main }}
                noMargin
            >
                <TextCard title="Admin Portal" titleSize="h3" align="center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Molestiae, rerum!
                </TextCard>
            </Container>

            <Container>
                <Paper className={classes.content}>
                    <div>
                        <UserTable />
                    </div>
                    <List className={classes.list}>
                        {listItems.map((item, index, arr) => {
                            return (
                                <div>
                                    <ListItem button>
                                        <ListItemText primary={item.label} />
                                    </ListItem>
                                    {index !== arr.length - 1 && <Divider />}
                                </div>
                            );
                        })}
                    </List>
                </Paper>
            </Container>
        </div>
    );
}
