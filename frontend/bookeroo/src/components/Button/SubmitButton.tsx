import { CircularProgress } from "@material-ui/core";
import React from "react";
import Button from "./Button";

interface Props {
    formId: string;
    isSubmitting: boolean;
    children?: React.ReactNode;
}

/**
 *  Button specifically for submitting of forms
 * @param formId form id
 * @param isSubmitting submitting state of the form
 * @param children text or react node in button
 * @returns button
 */
export default function SubmitButton(props: Props) {
    return (
        <Button
            variant="contained"
            color="secondary"
            type="submit"
            disabled={props.isSubmitting}
            form={props.formId}
        >
            {props.isSubmitting ? <CircularProgress /> : props.children}
        </Button>
    );
}
