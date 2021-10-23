export function createTagsArray(tags: string | null): string[] {
    if (tags === null || tags === "") return [];
    if (tags.includes("|")) {
        return tags.split("|");
    } else return [tags];
}
