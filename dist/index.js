"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const stream_1 = require("stream");
const filterByRegex = (regex) => new stream_1.Transform({
    objectMode: true,
    transform(chunk, encoding = 'utf8', callback) {
        const lines = (chunk + '').split('\n');
        callback(null, lines.filter(line => regex.test(line)).join('\n'));
    }
});
(0, stream_1.pipeline)((0, fs_1.createReadStream)((0, path_1.join)('files', 'style-guide.md')), filterByRegex(/-\s(?:[\S\s]+):/), process.stdout, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log('The operation was a success.');
});
