import { promises as fsPromise } from "fs";
import { getColors } from "./utils/utility"; 

readFile('./assets/style-guide.md', console.log)

async function readFile(path: string, cb: Function) {
    try {
        const result = getColors(await fsPromise.readFile(path, 'utf-8'))
        cb(result)
    } catch (err: any) {
        if (err.code === 'ENOENT') {
            console.log('No such file exists.')
            return
        }

        console.error(err)
    }
}

