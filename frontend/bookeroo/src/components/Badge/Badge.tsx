import { Chip } from "@material-ui/core";
import React from "react";

interface Props {
    label: string;
}

export default function Badge(props: Props) {
    return <Chip size="small" label={props.label} color="secondary" />;
}
