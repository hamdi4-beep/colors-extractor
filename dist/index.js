"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const utility_1 = require("./utils/utility");
readFile('./assets/style-guide.md').then(result => {
    const fsPromise = fs_1.promises.writeFile('colors.json', JSON.stringify(result, null, '\t'));
    fsPromise.then(() => console.log('Created a textfile with the color values in the root folder.'));
});
function readFile(path) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = (0, utility_1.extractColors)(yield fs_1.promises.readFile(path, 'utf-8'));
            return result;
        }
        catch (err) {
            handleError(err);
        }
    });
}
function handleError(err) {
    if (err.code === 'ENOENT') {
        console.log('No such file exists.');
        return;
    }
    console.error('Error Log:', err);
}
