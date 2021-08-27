export function camelCase(value: string) {
    // https://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case
    return value.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
}
