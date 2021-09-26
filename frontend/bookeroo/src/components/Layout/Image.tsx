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
    // TODO MUImage has issues with resizing within grid layout causing it to disappear
    /*  return (
        <Paper>
            <img {...props} style={{ width: "100%", height: "100%" }} />
        </Paper>
    ); */
    return (
        <Paper>
            <MUImage
                {...props}
                cover={!props.stretch}
                style={{ minHeight: "auto", minWidth: "auto" }}
            />
        </Paper>
    );
}
