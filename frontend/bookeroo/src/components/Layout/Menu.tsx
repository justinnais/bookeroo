import { MenuItem, Menu as MenuMui } from "@material-ui/core";
import React from "react";
import Button from "../Button/Button";

export interface IMenuItem {
    label: string;
    onClick: () => void;
}

interface Props {
    id: string;
    buttonLabel: string;
    items: IMenuItem[];
}

export default function Menu(props: Props) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                aria-controls={props.id}
                aria-haspopup="true"
                onClick={handleClick}
            >
                {props.buttonLabel}
            </Button>
            <MenuMui
                id={props.id}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {props.items.map((item, key) => {
                    const itemClick = (
                        event: React.MouseEvent<HTMLButtonElement>
                    ) => {
                        event.stopPropagation(); // TODO this is having issues
                        item.onClick();
                        console.log("is this happending");
                        handleClose();
                    };
                    return (
                        <span
                            key={key}
                            onClick={(event) => event.stopPropagation()}
                        >
                            <MenuItem onClick={() => itemClick}>
                                {item.label}
                            </MenuItem>
                        </span>
                    );
                })}
            </MenuMui>
        </div>
    );
}
