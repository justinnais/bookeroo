import {
    MenuItem,
    Menu as MenuMui,
} from "@material-ui/core";
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

/**
 * Dropdown menu that shows on click at location provided
 * @param props items to show in menu
 * @returns menu
 */
export default function Menu(props: Props) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // TODO bug with opening menu and clicking out of it, will still propogate through events
    // ! findDOMNode is deprecated in StrictMode - warning message that is related to MUI v4, if we have time we can potentially move to v5 where this has been resolved, currently doesn't have a major impact
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
                    const handleItemClick = (
                        event: React.MouseEvent<HTMLLIElement, MouseEvent>
                    ) => {
                        event.stopPropagation();
                        item.onClick();
                        handleClose();
                    };
                    return (
                        <MenuItem key={key} onClick={handleItemClick}>
                            {item.label}
                        </MenuItem>
                    );
                })}
            </MenuMui>
        </div>
    );
}
