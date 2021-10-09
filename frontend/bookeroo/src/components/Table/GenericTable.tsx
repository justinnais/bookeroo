import {
    Paper,
    TableContainer,
    createStyles,
    makeStyles,
    Theme,
    Table,
    TablePagination,
} from "@material-ui/core";
import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import TableHeader from "./TableHeader";
import TableRows from "./TableRows";

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
    dataTransform?: (data: any) => string | number | Promise<string | number>;
    customComponent?: (data: any) => React.ReactNode; // must be provided when using a custom field
}

/**
 * The table takes a generic array of data and creates columns from the keys
 */
interface TableProps<T, K extends keyof T> {
    data: AxiosResponse<T> | undefined;
    columns: Array<TableColumn<T, K>>;
    onRowClick?: (row: T) => void; // passes back row information to the parent on click
    isLoading?: boolean;
    isError: boolean;
    printButton?: boolean;
    filter?: (data: T[]) => T[];
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
        tableFooter: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
        },
    })
);

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

export function handleAxiosData<T>(
    axios: AxiosResponse<T> | undefined
): Array<T> {
    let data: Array<T> = [];
    if (axios === undefined) {
        return [];
    }
    if (axios.status === 200) {
        if (Array.isArray(axios.data)) {
            data = axios.data;
        } else {
            data = [axios.data];
        }
    }
    return data;
}

/**
 *
 * @param props data, columns and row click action to be passed to generic table
 * @returns
 */
export default function GenericTable<T, K extends keyof T>(
    props: TableProps<T, K>
) {
    const { columns, onRowClick, printButton } = props;

    let data = handleAxiosData(props.data);

    if (props.filter) {
        data = props.filter(data);
    }

    const classes = useStyles();

    /* ascending or descending order of table */
    const [order, setOrder] = useState<Order>("asc");

    /* which column to sort table by */
    const [orderBy, setOrderBy] = useState<keyof T>();

    /* pages for pagination of table */
    const [page, setPage] = useState(0);

    /* rows per page setting */
    const [rowsPerPage, setRowsPerPage] = useState(10);

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

    const PrintButton = () => (
        <Button
            variant="outlined"
            color="secondary"
            onClick={() => console.log("data", data)} // TODO create CSV with data
        >
            Print
        </Button>
    );

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableContainer>
                    <Table className={classes.table}>
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
                            isError={props.isError}
                            page={page}
                            rowsPerPage={rowsPerPage}
                        />
                    </Table>
                </TableContainer>
                <div className={classes.tableFooter}>
                    {printButton ? <PrintButton /> : undefined}
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
                </div>
            </Paper>
        </div>
    );
}
