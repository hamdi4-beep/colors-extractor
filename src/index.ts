import { promises as fsPromises } from "fs";
import { extractColors } from "./utils/utility";

readFile('./assets/style-guide.md').then(result => {
    const fsPromise = fsPromises.writeFile('colors.txt', JSON.stringify(result, null, '\t'))
    fsPromise.then(() => console.log('Created a textfile with the color values in the root folder.'))
})

async function readFile(path: string) {
    try {
        const result = extractColors(await fsPromises.readFile(path, 'utf-8'))
        return result
    } catch (err: any) {
        handleError(err)
    }
}

function handleError(err: any) {
    if (err.code === 'ENOENT') {
        console.log('No such file exists.')
        return
    }

    console.error('Error Log:', err)
}