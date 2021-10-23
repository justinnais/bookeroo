import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { useAlertStore } from "../../stores/useAlertStore";
// import AlertMUI, { AlertColor } from "@mui/material/Alert";

export default function Alert() {
    const renderAlert: boolean = useAlertStore((state: any) => state.open);
    const message: string = useAlertStore((state) => state.message);
    // const variant: AlertColor = useAlertStore((state) => state.variant);
    const setOpen = useAlertStore((state) => state.setOpen);
    const close = () => {
        setOpen(false);
    };

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                open={renderAlert}
                autoHideDuration={2000}
                onClose={close}
                message={message}
                action={
                    <React.Fragment>
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={close}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
            {/* //TODO fix the import for alert to allow for variants */}
            {/* <AlertMUI
                    onClose={close}
                    severity={variant}
                    sx={{ width: "100%" }}
                >
                    {message}
                </AlertMUI> */}
        </div>
    );
}
