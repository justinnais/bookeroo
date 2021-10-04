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
import { useMutation, useQuery } from "react-query";
import { editUser, listUsers } from "../api/stores/user";
import Container from "../components/Layout/Container";
import TextCard from "../components/Layout/TextCard";
import { theme } from "../styles/theme";
import { IAccount } from "../api/models/Account";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { convertDate } from "./Profile";
import GenericTable, { TableColumn } from "../components/Table/GenericTable";
import Button from "../components/Button/Button";
import Menu, { IMenuItem } from "../components/Layout/Menu";
import { AccountStatus } from "../util/enums";
import { useAdminStore } from "../stores/useAdminStore";
import { useAlertStore } from "../stores/useAlertStore";
import UserTable from "../components/Table/AdminTables/UserTable";
import Tabs from "../components/Layout/Tabs";
import BookTable from "../components/Table/AdminTables/BookTable";

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
    const history = useHistory();

    /* const listItems = [
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
    ]; */

    const tabs = [
        { label: "Users", component: <UserTable /> },
        { label: "Books", component: <BookTable /> },
        { label: "Transactions", component: <UserTable /> },
    ];

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
                {/* <Paper className={classes.content}> */}
                <Tabs tabs={tabs} />
                {/* <List className={classes.list}>
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
                    </List> */}
                {/* </Paper> */}
            </Container>
        </div>
    );
}
