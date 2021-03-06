import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    createStyles,
    makeStyles,
    Theme,
    FormHelperText,
} from "@material-ui/core";
import React, { useState } from "react";
import { camelCase } from "../../util/stringManipulation";

interface Props {
    label: string;
    options: string[];
    formik: any;
}

/**
 * 
 * @param props label and options to show in dropdown, formik props
 * @returns validated dropdown input
 */
export default function DropdownSelect(props: Props) {
    const [value, setValue] = useState("");
    const id = camelCase(props.label); // converts label into id

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) =>
        setValue(event.target.value as string);

    const helperText = props.formik.touched[id] && props.formik.errors[id];
    const error = !!props.formik.touched[id] && !!props.formik.errors[id];

    return (
        <FormControl
            variant="outlined"
            fullWidth
            color="secondary"
            error={error}
        >
            <InputLabel id={`${id}-label`}>{props.label}</InputLabel>
            <Select
                labelId={`${id}-label`}
                id={id}
                value={value}
                onChange={handleChange}
                label={props.label}
                {...props.formik.getFieldProps(id)}
            >
                {props.options.map((option, key) => (
                    <MenuItem value={option} key={key}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    );
}
