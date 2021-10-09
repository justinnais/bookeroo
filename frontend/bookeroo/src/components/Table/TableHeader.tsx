import {
    TableHead,
    TableRow,
    TableCell,
    TableSortLabel,
    createStyles,
    makeStyles,
    Theme,
} from "@material-ui/core";
import React from "react";
import { titleCase } from "../../util/stringManipulation";
import { TableColumn } from "./GenericTable";

interface TableHeaderProps<T, K extends keyof T> {
    columns: Array<TableColumn<T, K>>;
    order: Order;
    orderBy: K | undefined;
    onRequestSort: (
        event: React.MouseEvent<unknown>,
        property: keyof T
    ) => void;
}

type Order = "asc" | "desc";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        visuallyHidden: {
            border: 0,
            clip: "rect(0 0 0 0)",
            height: 1,
            margin: -1,
            overflow: "hidden",
            padding: 0,
            position: "absolute",
            top: 20,
            width: 1,
        },
    })
);

/**
 * Table Header component that takes an array of id's and converts them into table heading cells
 * @param props array of columns to convert, and sorting props
 * @returns sortable table heading
 */
export default function TableHeader<T, K extends keyof T>(
    props: TableHeaderProps<T, K>
) {
    const { columns, order, orderBy, onRequestSort } = props;
    const classes = useStyles();

    const createSortHandler =
        (property: keyof T) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    const headers = columns.map((column, index) => {
        return {
            key: `header-${column.key}-${index}`,
            label: column.header || titleCase(column.key.toString()),
            align: column.align ? column.align : "left",
        };
    });

    return (
        <TableHead>
            <TableRow>
                {headers.map((column) => (
                    <TableCell
                        key={column.key}
                        align={column.align}
                        sortDirection={orderBy === column.key ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === column.key}
                            direction={orderBy === column.key ? order : "asc"}
                            onClick={createSortHandler(column.key as keyof T)}
                        >
                            {column.label}
                            {orderBy === column.key ? (
                                <span className={classes.visuallyHidden}>
                                    {order === "desc"
                                        ? "sorted descending"
                                        : "sorted ascending"}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
