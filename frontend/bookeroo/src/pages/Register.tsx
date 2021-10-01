import {
    CircularProgress,
    createStyles,
    makeStyles,
    Theme,
} from "@material-ui/core";
import Button from "../components/Button/Button";
import React, { useState } from "react";
import FormCard from "../components/Form/FormCard";
import * as yup from "yup";
import { AccountType } from "../util/enums";
import FormGenerator, {
    GeneratedField,
} from "../components/Form/FormGenerator";
import Container from "../components/Layout/Container";
import { registerUser } from "../api/stores/user";
import {
    CreatePersonalAccountRequest,
    CreateBusinessAccountRequest,
} from "../api/models/Account";
import { useAlertStore } from "../stores/useAlertStore";
import { useHistory } from "react-router";

declare module "yup" {
    interface ArraySchema<T> {
        unique(mapper: (a: T) => T, message?: any): ArraySchema<T>;
    }
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        center: {
            display: "grid",
            placeItems: "center",
            minHeight: "50vh",
        },
        link: {
            textAlign: "center",
        },
    })
);

// TODO add unique property errors
// https://github.com/jquense/yup/issues/345
/* yup.addMethod(
    yup.array,
    "unique",
    function (
        mapper = (a: any) => a,
        message: string = "${path} may not have duplicates"
    ) {
        return this.test("unique", message, (list) => {
            return list
                ? list.length === new Set(list.map(mapper)).size
                : false;
        });
    }
); */

export default function Register() {
    const foo = [{ displayName: "foo" }, { displayName: "test" }];
    const [isSubmitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [approvalRequired, setApprovalRequired] = useState(false);
    const classes = useStyles();
    const history = useHistory();
    const setAlert = useAlertStore((state) => state.setAlert);
    // TODO need to improve this
    const toast = (message: string) => {
        setAlert(message);
    };
    // fields shared between both types of accounts
    const baseFields: GeneratedField[] = [
        {
            label: "First Name",
            type: "text",
            schema: yup.string().required("First Name is required"),
        },
        {
            label: "Last Name",
            type: "text",
            schema: yup.string().required("Last Name is required"),
        },
        {
            label: "Display Name",
            type: "text",
            schema: yup
                .string()
                // .array()
                // .of(yup.string())
                .required("Display Name is required"),
            // .unique((foo) => foo, "duplicate name"),
        },
        {
            label: "Email",
            type: "email",
            schema: yup
                .string()
                .email("Email must be a valid email")
                .required("Email is required"),
        },
        {
            label: "Password",
            type: "password",
            schema: yup
                .string()
                .required("Password is required")
                .min(6, "Password is too short"),
        },
        {
            label: "Confirm Password",
            type: "password",
            schema: yup
                .string()
                .required("Please confirm password")
                .oneOf([yup.ref("password"), null], "Passwords must match"),
        },
    ];

    // fields for personal accounts
    const personalAccount: GeneratedField[] = [
        // {
        //     label: "First Name",
        //     type: "text",
        //     schema: yup.string().required("First Name is required"),
        // },
        // {
        //     label: "Last Name",
        //     type: "text",
        //     schema: yup.string().required("Last Name is required"),
        // },
    ];

    //fields for business accounts
    const businessAccount: GeneratedField[] = [
        {
            label: "Company Name",
            type: "text",
            schema: yup.string().required("Company Name is required"),
        },
        {
            label: "ABN", // TODO issues with camel case on this, create a text transform prop
            type: "text",
            schema: yup.string().required("ABN is required"),
        },
    ];

    const onSubmit = (values: any) => {
        // TODO update this
        setSubmitting(true);

        const partialRequest = {
            displayName: values.displayName,
            password: values.password,
            username: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
        };
        const request = approvalRequired
            ? {
                  ...partialRequest,
                  abn: values.aBN.replace(/\s+/g, ""),
                  accountType: AccountType.BUSINESS,
                  companyName: values.companyName,
              }
            : {
                  ...partialRequest,
                  accountType: AccountType.STANDARD,
              };

        // * this is without contact name for business
        /*  const partialRequest = {
            displayName: values.displayName,
            password: values.password,
            username: values.email,
        };
        const request = approvalRequired
            ? {
                  ...partialRequest,
                  abn: values.aBN.replace(/\s+/g, ""),
                  accountType: AccountType.BUSINESS,
                  companyName: values.companyName,
              }
            : {
                  ...partialRequest,
                  accountType: AccountType.STANDARD,
                  firstName: values.firstName,
                  lastName: values.lastName,
              }; */

        registerUser(request).then(
            (res) => handleResponse(res, request),
            (err) => handleError(err)
        );
        setSubmitting(false);
    };

    const handleResponse = (res: any, request: any) => {
        const message = approvalRequired
            ? `Please wait for admin approval of your business account ${request.companyName}`
            : `Successfully created account for ${request.displayName}`;
        if (res.status === 201) {
            toast(message);
            history.push("/login");
        }
        // setErrors({});
    };

    const handleError = (err: any) => {
        const errors: { [key: string]: string } = err.response.data;
        Object.values(errors).map((error) => toast(error));
        // setErrors(err.response.data);
    };

    // if approval is required, use a business account
    const fields = (
        approvalRequired ? businessAccount : personalAccount
    ).concat(baseFields);

    const form = FormGenerator("registerForm", fields, onSubmit);

    // TODO on button swap clear all fields
    const buttons = [
        <Button onClick={() => setApprovalRequired(!approvalRequired)}>
            {approvalRequired
                ? "Creating a personal account?"
                : "Creating a business account?"}
        </Button>,
        <Button
            variant="contained"
            color="secondary"
            form="registerForm"
            disabled={isSubmitting}
            type="submit"
        >
            {isSubmitting ? <CircularProgress /> : "Sign Up"}
        </Button>,
    ];

    return (
        <Container>
            <div className={classes.center}>
                <FormCard title="Sign Up" form={form} buttons={buttons} />
            </div>
        </Container>
    );
}
