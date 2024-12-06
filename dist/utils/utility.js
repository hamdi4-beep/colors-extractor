"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractColors = extractColors;
const stylesRegex = /^(?:#{2}|-)/;
const categoryRegex = /^#{3}\s(.+)$/;
let category;
function extractColors(data) {
    const values = extractValues(data.split('\n').filter(line => stylesRegex.test(line)));
    if (!values.length) {
        console.log('None of the targeted categories were found.');
        return;
    }
    return Object.assign({}, convertArrToObject(values));
}
const convertToKebabCase = (key) => key.toLowerCase().substring(2).split(' ').join('-');
const isObjectEmpty = (obj) => Object.keys(obj).length === 0;
const convertArrToObject = (arr) => arr.reduce((prev, curr) => {
    const [category, [key, value]] = curr;
    if (isObjectEmpty(prev))
        return {
            [category]: {
                [key]: value
            }
        };
    const colors = prev[category];
    return Object.assign(Object.assign({}, prev), { [category]: Object.assign(Object.assign({}, colors), { [key]: value }) });
}, {});
function extractValues(lines) {
    const results = [];
    for (const line of lines) {
        if (categoryRegex.test(line))
            category = line.match(categoryRegex)[1].toLowerCase();
        if (line.startsWith('-'))
            addValue(line);
    }
    return results.filter(Boolean);
    function addValue(line) {
        const [key, value] = line.split(/:\s?/);
        if (category === 'primary' ||
            category === 'neutral')
            results.push([category, [convertToKebabCase(key), value]]);
    }
}
