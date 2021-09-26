/**
 * Converts string of authors into array of authors
 * @param authorString string of authors fetched from database - likely in format of Lastname1, Firstname1|Lastname2, Firstname2|Lastname3, Firstname3
 * @returns array of authors in format [Firstname1 Lastname 1, Firstname2 Lastname 2, Firstname3 Lastname 3]
 */
export function createAuthorArray(authorString: string): string[] {
    if (authorString.includes("|")) {
        const multipleAuthors = authorString.split("|");
        return multipleAuthors.map((author) => reverseFirstLastName(author));
    }
    return authorString.includes("|")
        ? authorString.split("|")
        : [reverseFirstLastName(authorString)];
}

function reverseFirstLastName(author: string) {
    // reverses order of Lastname, Firstname into Firstname Lastname
    if (author.includes(", ")) {
        const authorSplit = author.split(", ");
        return authorSplit.reverse().join(" ");
    } else {
        return author;
    }
}
