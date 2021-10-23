import { Chip } from "@material-ui/core";
import React from "react";

interface Props {
    label: string;
}

/**
 * 
 * @param props badge label
 * @returns Small badge to display categories in
 */
export default function Badge(props: Props) {
    return <Chip size="small" label={props.label} color="secondary" />;
}
