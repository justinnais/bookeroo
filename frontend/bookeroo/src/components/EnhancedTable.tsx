import {
    Paper,
    TableContainer,
    TableBody,
    TableRow,
    TableCell,
    createStyles,
    makeStyles,
    Theme,
    Table,
    TableHead,
    TableSortLabel,
} from "@material-ui/core";
import React from "react";
import { titleCase } from "../util/stringManipulation";

// https://react.christmas/2020/22

/**
 * Shape of table column
 * Takes the key from the type of data it is displaying
 * header is optional text override, if not provided it will Title Case the key
 */
export interface TableColumn<T, K extends keyof T> {
    key: K;
    header?: string;
    align?: "left" | "right";
}

/**
 * The table takes a generic array of data and creates columns from the keys
 */
interface TableProps<T, K extends keyof T> {
    data: Array<T>;
    columns: Array<TableColumn<T, K>>;
    onRowClick?: (data?: any) => void;
}

type TableHeaderProps<T, K extends keyof T> = {
    columns: Array<TableColumn<T, K>>;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
        },
        paper: {
            width: "100%",
            marginBottom: theme.spacing(2),
        },
        table: {
            minWidth: 750,
        },
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

const TableHeader = <T, K extends keyof T>({
    columns,
}: TableHeaderProps<T, K>): JSX.Element => {
    const headers = columns.map((column, index) => {
        return {
            key: `header-${column.key}`,
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
                        // sortDirection={orderBy === column.id ? order : false}
                    >
                        <TableSortLabel
                        // active={orderBy === column.id}
                        // direction={orderBy === column.id ? order : "asc"}
                        // onClick={createSortHandler(column.id)}
                        >
                            {column.label}
                            {/* {orderBy === column.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === "desc"
                                        ? "sorted descending"
                                        : "sorted ascending"}
                                </span>
                            ) : null} */}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

const TableRows = <T, K extends keyof T>({
    data,
    columns,
    onRowClick,
}: TableProps<T, K>) => {
    // on row click, pass the row back to parent
    const handleClick = (row: T) => {
        if (onRowClick) {
            onRowClick(row);
        }
    };
    // map each row of data, then in each row map the cells
    const rows = data.map((row, rowIndex) => {
        return (
            <TableRow
                hover
                onClick={() => handleClick(row)}
                key={`row-${rowIndex}`}
            >
                {columns.map((column, colIndex) => (
                    <TableCell key={`row-${rowIndex}-cell-${colIndex}`}>
                        {row[column.key]}
                    </TableCell>
                ))}
            </TableRow>
        );
    });

    return <TableBody>{rows}</TableBody>;
};

const EnhancedTable = <T, K extends keyof T>({
    data,
    columns,
    onRowClick,
}: TableProps<T, K>) => {
    const classes = useStyles();

    const handleClick = (row: T) => {
        if (onRowClick) {
            onRowClick(row);
        }
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        // size={dense ? "small" : "medium"}
                        aria-label="enhanced table"
                    >
                        <TableHeader columns={columns} />
                        <TableRows
                            columns={columns}
                            data={data}
                            onRowClick={(row: T) => handleClick(row)}
                        />
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
};

export default EnhancedTable;
