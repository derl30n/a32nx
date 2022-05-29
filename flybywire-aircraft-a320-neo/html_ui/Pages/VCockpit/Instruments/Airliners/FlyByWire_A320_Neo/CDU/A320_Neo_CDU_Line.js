class Column {
    constructor(index, text, isLeftAligned = true, isTextSmall = false, color = "white") {
        this.raw = text;
        this.color = color;
        this.isTextSmall = isTextSmall;
        this.length = text.length;
        this.anchorPos = isLeftAligned ? index : index - this.length + 1;
    }

    get text() {
        return `${this.isTextSmall ? "{small}" : ""}{${this.color}}${this.raw}{end}${this.isTextSmall ? "{end}" : ""}`;
    }
}

/**
 * Returns a formatted mcdu line
 * @param params {Column}
 * @returns {string[]}
 */
function formatLine(...params) {
    params.sort((a, b) => a.anchorPos - b.anchorPos);

    let line = "".padStart(24);
    let pos = -1; // refers to imaginary index on the 24 digit limited mcdu line
    let index = 0; // points at "cursor" within predefined line

    for (const item of params) {
        /* --------> populating text from left to right --------> */
        const newStart = item.anchorPos;
        const newEnd = newStart + item.length;

        // prevent adding empty or invalid stuff
        if (item.length === 0 || newEnd < 0 || newStart > 23 || newEnd <= pos) {
            continue;
        }

        if (pos === -1) {
            pos = 0;
        }

        // removes text overlap
        item.raw = item.raw.slice(Math.max(0, pos - newStart), Math.min(item.length, Math.max(1, 23 - newEnd)));

        const limMin = Math.max(0, newStart - pos);
        const limMax = Math.min(23, newEnd - pos);

        line = line.slice(0, index + limMin) + item.text + line.slice(index + limMax);
        index += limMin + item.text.length;
        pos = newEnd;
    }

    return [line.replace(/\s/g, '{sp}')];
}
