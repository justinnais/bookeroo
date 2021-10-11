import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { request } from "http";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
    createListing,
    listBookListings,
    listListings,
} from "../../api/stores/listing";
import { useAlertStore } from "../../stores/useAlertStore";
import FormCard from "../Form/FormCard";
import FormGenerator, { GeneratedField } from "../Form/FormGenerator";
import * as yup from "yup";
import { CreateListingRequest } from "../../api/models/Listing";
import { IBook } from "../../api/models/Book";
import SubmitButton from "../Button/SubmitButton";
import { useAuthStore } from "../../stores/useAuthStore";
import { BookCondition } from "../../util/enums";
import { useQuery } from "react-query";

interface Props {
    book: IBook;
}

const useStyles = makeStyles((theme: Theme) => createStyles({}));

export default function CreateListingForm(props: Props) {
    const classes = useStyles();
    const history = useHistory();
    const user = useAuthStore((state) => state.user);
    const setAlert = useAlertStore((state) => state.setAlert);
    const toast = (message: string) => {
        setAlert(message);
    };
    const [isSubmitting, setSubmitting] = useState(false);

    const { refetch } = useQuery("listBookListings", () =>
        listBookListings(props.book.isbn)
    );

    const formId = "listingForm";

    const fields: GeneratedField[] = [
        {
            label: "Condition",
            type: "select",
            options: Object.values(BookCondition),
            schema: yup.string().required("Condition is required"),
        },
        {
            label: "Condition Description",
            type: "text",
            schema: yup.string().required("Condtion Description is required"),
        },
        {
            label: "Price",
            type: "number",
            schema: yup.string().required("Price is required"),
        },
    ];

    const onSubmit = (values: any) => {
        setSubmitting(true);
        if (user) {
            const { book } = props;
            const request: CreateListingRequest = {
                bookIsbn: book.isbn || book.isbn13,
                condition: values.condition,
                conditionDesc: values.conditionDescription,
                isUsed: values.condition !== BookCondition.NEW,
                userId: user.id,
                price: values.price,
            };

            createListing("sell", request).then(
                (res) => handleResponse(res, request),
                (err) => handleError(err)
            );
        } else {
            toast("Please sign in to create a listing");
        }

        setSubmitting(false);
    };

    const handleResponse = (res: any, request: CreateListingRequest) => {
        if (res.status === 200) {
            toast(`Successfully created listing for ${props.book.title}`);
            refetch();
        }
    };

    const buttons = [
        <SubmitButton formId={formId} isSubmitting={isSubmitting}>
            Create listing
        </SubmitButton>,
    ];

    const handleError = (err: any) => {
        const errors: { [key: string]: string } = err.response.data;
        Object.values(errors).map((error) => toast(error));
    };

    const form = FormGenerator(formId, fields, onSubmit);

    return <FormCard title="Create Listing" form={form} buttons={buttons} />;
}
