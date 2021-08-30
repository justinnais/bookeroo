import { makeStyles, Theme, createStyles, Grid, Link } from "@material-ui/core";
import { useFormik } from "formik";
import React, { useState } from "react";

import * as yup from "yup";
import { camelCase } from "../../util/stringManipulation";
import TextInput from "./TextInput";
import { createYupSchema } from "./yupSchema";
export interface GeneratedField {
    label: string;
    type?: "text" | "email" | "password";
    schema: yup.AnySchema;
    initialValue: string;
}

/**
 * Generates a form in a grid, with form validation - currently only text inputs
 * @param fields array of fields to be generated
 * @param onSubmit callback for when form is submitted
 * @param formId id of the form to attatch the submit button to
 * @returns form JSX element
 */
export default function FormGenerator(
    fields: GeneratedField[],
    onSubmit: (values: any) => void,
    formId: string
) {
    const initialValues: { [key: string]: string } = {};
    fields.forEach((field) => {
        initialValues[camelCase(field.label)] = field.initialValue;
    });
    const schema = fields.reduce(createYupSchema, {});
    const validationSchema = yup.object().shape(schema);
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => onSubmit(values),
    });

    const form = (
        <form onSubmit={formik.handleSubmit} id={formId}>
            <Grid container spacing={2}>
                {fields.map((field, key) => {
                    return (
                        <Grid item xs={12} key={key}>
                            <TextInput
                                label={field.label}
                                type={field.type}
                                formik={formik}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </form>
    );

    return form;
}