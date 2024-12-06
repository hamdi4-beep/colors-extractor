import { promises as fsPromise } from "fs";
import { extractColors } from "./utils/utility"; 

readFile('./assets/style-guide.md', (result: string) => {
    const promise = fsPromise.writeFile('result.txt', JSON.stringify(result, null, '\t'))
    promise.then(() => console.log('Finished writing the results to a file named "results" which can be found in the root folder.'))
})

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