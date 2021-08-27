import * as yup from "yup";
import { camelCase } from "../../util/stringManipulation";
import { GeneratedField } from "./FormGenerator";

/**
 * Creates a yup schema based on provided fields
 * @param item ??
 * @param field field item to generate schema on
 * @returns
 */
export function createYupSchema(
    item: { [key: string]: yup.AnySchema },
    field: GeneratedField
) {
    const { label, schema } = field;
    const id = camelCase(label);
    item[id] = schema;
    return item;
}
