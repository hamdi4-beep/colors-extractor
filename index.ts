import { promises as fsPromise } from "fs";
import { processData } from "./utils/dataProcessing"; 

readFile('./assets/style-guide.md')

async function readFile(path: string) {
    try {
        const result = await fsPromise.readFile(path, 'utf-8')
        processData(result)
    } catch (err: any) {
        if (err.code === 'ENOENT') {
            console.log('No such file exists.')
            return
        }

        console.error(err)
    }
}

