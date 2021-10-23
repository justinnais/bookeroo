import React from "react";
import MUImage from "material-ui-image";
import { Paper } from "@material-ui/core";

interface Props {
    src: string;
    aspectRatio?: number;
    alt?: string;
    stretch?: boolean;
}

/**
 * Container for images
 * @param props image and options
 * @returns Image on paper
 */
export default function Image(props: Props) {
    // TODO MUImage has issues with resizing within grid layout causing it to disappear
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
