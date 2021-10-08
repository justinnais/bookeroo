import React from "react";
import Container from "../components/Layout/Container";
import TextCard from "../components/Layout/TextCard";
import { theme } from "../styles/theme";
import UserTable from "../components/Table/AdminTables/UserTable";
import Tabs from "../components/Layout/Tabs";
import BookTable from "../components/Table/AdminTables/BookTable";
import TransactionTable from "../components/Table/AdminTables/TransactionTable";

export default function Admin() {
    const tabs = [
        { label: "Users", component: <UserTable /> },
        { label: "Books", component: <BookTable /> },
        { label: "Transactions", component: <TransactionTable /> },
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
                <Tabs tabs={tabs} />
            </Container>
        </div>
    );
}
