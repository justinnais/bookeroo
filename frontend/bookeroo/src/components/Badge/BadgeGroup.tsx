import { Theme } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";
import React from "react";
import Badge from "./Badge";

interface Props {
    tags: string[];
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            flexDirection: "row",
            gap: theme.spacing(1),
        },
    })
);

/**
 * 
 * @param props array of tags to map 
 * @returns group of badges
 */
export default function BadgeGroup(props: Props) {
    const styles = useStyles();
    return (
        <div className={styles.root}>
            {props.tags.map((tag) => (
                <Badge label={tag} />
            ))}
        </div>
    );
}
