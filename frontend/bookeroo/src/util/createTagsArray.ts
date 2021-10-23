import { titleCase } from "./stringManipulation";

export function createTagsArray(tags: string | null): string[] {
    let updatedTags = [];
    if (tags === null || tags === "") return [];
    if (tags.includes("|")) {
        updatedTags = tags.split("|");
    } else updatedTags = [tags];

    return updatedTags.map((tag) => titleCase(tag));
}
