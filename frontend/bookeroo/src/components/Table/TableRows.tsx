import { TableRow, TableCell, TableBody } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { AxiosResponse } from "axios";
import React from "react";
import { handleAxiosData, TableColumn } from "./GenericTable";

/**
 * The table takes a generic array of data and creates columns from the keys
 */
interface TableRowProps<T, K extends keyof T> {
    data: T[];
    columns: Array<TableColumn<T, K>>;
    onRowClick?: (row: T) => void; // passes back row information to the parent on click
    isLoading?: boolean;
    isError: boolean;
    page: number;
    rowsPerPage: number;
}

export default function TableRows<T, K extends keyof T>(
    props: TableRowProps<T, K>
) {
    const { columns, onRowClick, data, page, rowsPerPage } = props;
    // if (props.filter) {
    //     data = data.filter((item) => filterResults(props.filter || "", item));
    // }
    // on row click, pass the row back to parent
    const handleClick = (row: T) => {
        if (onRowClick) {
            onRowClick(row);
        }
    };

    const getTableCell = (column: TableColumn<T, K>, row: T) => {
        // if a custom component is provided, pass data back and render
        if (column.key === "custom") {
            return column.customComponent ? column.customComponent(row) : null;
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
        rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    if (emptyRows > 0) {
        rows.push(
            <TableRow
                key={"fillerRow"}
                style={{
                    height: 53 * emptyRows,
                }}
            >
                <TableCell colSpan={columns.length} />
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
    } else if (props.isError) {
        return (
            <TableBody>
                <TableRow>
                    <TableCell colSpan={columns.length}>
                        There was a problem loading the data. Please try again.
                    </TableCell>
                </TableRow>
            </TableBody>
        );
    } else {
        return <TableBody>{rows}</TableBody>;
    }
}
