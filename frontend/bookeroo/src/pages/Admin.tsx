import {
    createStyles,
    Divider,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    Theme,
} from "@material-ui/core";
import React from "react";
import Container from "../components/Layout/Container";
import TextCard from "../components/TextCard";
import { theme } from "../styles/theme";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            display: "grid",
            gridTemplateColumns: "1fr minmax(150px, 20%)",
        },
        list: {
            background: theme.palette.primary.main,
        },
    })
);

export default function Admin() {
    const classes = useStyles();
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

    // TODO fix heading once merged with book-display branch, made changed to the text card
    return (
        <div>
            <Container
                style={{ background: theme.palette.primary.main }}
                noMargin
            >
                <TextCard title="Admin Portal" titleSize="h3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Molestiae, rerum!
                </TextCard>
            </Container>

            <Container>
                <div className={classes.content}>
                    <div>this is where the content is displayed</div>
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
                </div>
            </Container>
        </div>
    );
}
