import { promises as fsPromise } from "fs";
import { extractColors } from "./utils/utility"; 

readFile('./assets/style-guide.md', console.log)

async function readFile(path: string, cb: Function) {
    try {
        const result = extractColors(await fsPromise.readFile(path, 'utf-8'))
        cb(result)
    } catch (err: any) {
        handleError(err)
    }
}

function handleError(err: any) {
    if (err.code === 'ENOENT') {
        console.log('No such file exists.')
        return
    }

    console.error(err)
}