import {
    Paper,
    TableContainer,
    TableBody,
    TableRow,
    TableCell,
    Checkbox,
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

const EnhancedTable = <T, K extends keyof T>({
    data,
    columns,
}: TableProps<T, K>) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        // size={dense ? "small" : "medium"}
                        aria-label="enhanced table"
                    >
                        <TableHeader columns={columns} />
                        <TableBody>
                            {/* <TableRow
                                hover
                                onClick={(event) => console.log("event", event)}
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={row.id.toString()}
                                selected={isItemSelected}
                            >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={isItemSelected}
                                        inputProps={{
                                            "aria-labelledby": labelId,
                                        }}
                                    />
                                </TableCell>
                                <TableCell
                                    component="th"
                                    id={labelId}
                                    scope="row"
                                    padding="none"
                                >
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">
                                    {row.userId}
                                </TableCell>
                                <TableCell align="right">
                                    {row.bookIsbn}
                                </TableCell>
                                <TableCell align="right">
                                    {row.condition}
                                </TableCell>
                                <TableCell align="right">
                                    {row.conditionDesc}
                                </TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                            </TableRow> */}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                /> */}
            </Paper>
        </div>
    );
};

export default EnhancedTable;
