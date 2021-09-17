import React from "react";
import MUImage from "material-ui-image";
import { Paper } from "@material-ui/core";

interface Props {
    src: string;
    aspectRatio?: number;
    alt?: string;
    stretch?: boolean;
}

export default function Image(props: Props) {
    return (
        <Paper>
            <MUImage {...props} cover={!props.stretch} />
        </Paper>
    );
}
