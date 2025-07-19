"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const stream_1 = require("stream");
const getFileExtension = (filename) => {
    var _a;
    return (_a = filename
        .split('.')
        .pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
};
const filename = (0, path_1.basename)((_a = process.argv[2]) !== null && _a !== void 0 ? _a : '');
const DIR_NAME = 'files';
if (!filename) {
    console.error('Expected a filename argument.');
    process.exit(1);
}
if (getFileExtension(filename) !== 'md') {
    console.log('Only markdown files are accepted.');
    process.exit(1);
}
const filterByRegex = (regex) => new stream_1.Transform({
    objectMode: true,
    transform(chunk, encoding = 'utf8', callback) {
        const lines = (chunk + '').split('\n');
        callback(null, lines.filter(line => regex.test(line)).join('\n'));
    }
});
(0, stream_1.pipeline)((0, fs_1.createReadStream)((0, path_1.join)(DIR_NAME, filename)), filterByRegex(/(?:#{2,}|-\s[\S\s]+)/), (0, fs_1.createWriteStream)('results.txt'), (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log('Created a text file in the root directory.');
});
