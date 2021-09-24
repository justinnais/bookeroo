export function camelCase(value: string) {
    // https://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case
    return value.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
}

/**
 * Converts a string to Title Case
 * https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
 * @param value string to convert
 * @returns value converted to Title Case
 */
export function titleCase(value: string) {
    return value.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
