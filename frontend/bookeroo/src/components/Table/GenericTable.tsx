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
    TablePagination,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import { titleCase } from "../../util/stringManipulation";
import Button from "../Button/Button";

// https://react.christmas/2020/22

/**
 * Shape of table column
 * Takes the key from the type of data it is displaying
 * header is optional text override, if not provided it will Title Case the key
 * dataTransform passes a function to convert into more appropriate content - eg. sellerId passed through transform that fetches the sellers name, displays 'John Smith' instead of 85747032
 */
export interface TableColumn<T, K extends keyof T> {
    key: K | "custom"; // allows for custom columns
    header?: string;
    align?: "left" | "right";
    dataTransform?: (data: any) => string | number;
    customComponent?: (data: any) => React.ReactNode; // must be provided when using a custom field
}

/**
 * The table takes a generic array of data and creates columns from the keys
 */
interface TableProps<T, K extends keyof T> {
    data: Array<T>;
    columns: Array<TableColumn<T, K>>;
    onRowClick?: (row: T) => void; // passes back row information to the parent on click
    isLoading?: boolean;
}

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

// ! this breaks stuff
/* function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
} */

function sort<T>(data: Array<T>, comparator: (a: T, b: T) => number) {
    console.log("sorting", data);
}

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
) => number {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

enum PossibleIds {
    id = "id",
    isbn = "isbn",
}

/**
 *
 * @param props data, columns and row click action to be passed to generic table
 * @returns
 */
export default function GenericTable<T, K extends keyof T>(
    props: TableProps<T, K>
) {
    const { data, columns, onRowClick } = props;
    const classes = useStyles();

    /* ascending or descending order of table */
    const [order, setOrder] = React.useState<Order>("asc");

    /* which column to sort table by */
    const [orderBy, setOrderBy] = React.useState<keyof T>();

    /* pages for pagination of table */
    const [page, setPage] = React.useState(0);

    /* rows per page setting */
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    /* callback to pass generic row back to parent */
    const handleClick = (row: T) => {
        if (onRowClick) {
            onRowClick(row);
        }
    };

    /* sets the new sort order of the table */
    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof T
    ) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        // setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    /**
     * Table Header component that takes an array of id's and converts them into table heading cells
     * @param props array of columns to convert, and sorting props
     * @returns sortable table heading
     */
    const TableHeader = <T, K extends keyof T>(
        props: TableHeaderProps<T, K>
    ): JSX.Element => {
        const { columns, order, orderBy, onRequestSort } = props;

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
                            sortDirection={
                                orderBy === column.key ? order : false
                            }
                        >
                            <TableSortLabel
                                active={orderBy === column.key}
                                direction={
                                    orderBy === column.key ? order : "asc"
                                }
                                onClick={createSortHandler(
                                    column.key as keyof T
                                )}
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
    };

    /**
     * Converts generic data objects into sortable table rows based on its provided columns
     * @param props generic data of type T, and its columns, row action callback
     * @returns mapped out rows of generic table data
     */
    const TableRows = <T, K extends keyof T>(props: TableProps<T, K>) => {
        const { data, columns, onRowClick } = props;
        // on row click, pass the row back to parent
        const handleClick = (row: T) => {
            if (onRowClick) {
                onRowClick(row);
            }
        };

        // const sortedRows = stableSort(
        //     data,
        //     getComparator(order, orderBy)
        // ).slice(page * rowsPerPage, rowsPerPage + rowsPerPage);

        // sort<T>(data, getComparator(order, orderBy));

        const getTableCell = (column: TableColumn<T, K>, row: T) => {
            // if a custom component is provided, pass data back and render
            if (column.key === "custom") {
                return column.customComponent
                    ? column.customComponent(row)
                    : null;
            } else if (column.dataTransform) {
                return column.dataTransform(row[column.key]);
            } else {
                return row[column.key];
            }
        };

        // divide data into pages
        const slicedPages = data.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        );
        // map each row of data, then in each row map the cells
        const rows = slicedPages.map((row, rowIndex) => {
            return (
                <TableRow
                    hover
                    style={{ cursor: "pointer" }}
                    onClick={() => handleClick(row)}
                    key={`row-${rowIndex}`}
                >
                    {columns.map((column, colIndex) => (
                        <TableCell key={`row-${rowIndex}-cell-${colIndex}`}>
                            {getTableCell(column, row)}
                        </TableCell>
                    ))}
                </TableRow>
            );
        });

        //empty row to display to keep table same height
        const emptyRows =
            rowsPerPage -
            Math.min(rowsPerPage, data.length - page * rowsPerPage);

        if (emptyRows > 0) {
            rows.push(
                <TableRow
                    key={"fillerRow"}
                    style={{
                        height: 53 * emptyRows,
                    }}
                >
                    <TableCell colSpan={6} />
                </TableRow>
            );
        }

        if (props.isLoading) {
            const skeletonRows: number[] = [...Array(rowsPerPage)];
            // return skeleton rows if loading
            return (
                <TableBody>
                    {skeletonRows.map((row, rowIndex) => (
                        <TableRow key={`skeleton-row-${rowIndex}`}>
                            {columns.map((column, colIndex) => (
                                <TableCell
                                    key={`skeleton-row-${rowIndex}-cell-${colIndex}`}
                                >
                                    <Skeleton variant="text" />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            );
        } else {
            return <TableBody>{rows}</TableBody>;
        }
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        aria-label="enhanced table"
                    >
                        <TableHeader
                            columns={columns}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />

                        <TableRows
                            columns={columns}
                            data={data}
                            onRowClick={(row: T) => handleClick(row)}
                            isLoading={props.isLoading}
                        />
                    </Table>
                </TableContainer>
                <TablePagination
                    // TODO this pagination is fine for now but will be better to use paginated requests from React Query and database
                    rowsPerPageOptions={[10, 20, 40]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}
