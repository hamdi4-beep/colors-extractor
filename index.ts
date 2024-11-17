import { promises as fsPromise } from "fs";
import { processData } from "./utils/dataProcessing"; 

readFile('./assets/style-guide.md', console.log)

async function readFile(path: string, cb: Function) {
    try {
        const result = await fsPromise.readFile(path, 'utf-8')
        cb(processData(result))
    } catch (err: any) {
        if (err.code === 'ENOENT') {
            console.log('No such file exists.')
            return
        }

        console.error(err)
    }
}

