import { existsSync, promises as fsPromises, mkdirSync } from "fs";
import { extractColors } from "./utils/utility";

readFile('./style-guide.md', (result: unknown) => {
    if (!existsSync('data')) mkdirSync('data')
    fsPromises.writeFile('data/colors.json', JSON.stringify(result, null, '\t'))
    console.log('Created a colors json file inside data folder.')
})

async function readFile(path: string, cb: Function) {
    try {
        const result = extractColors(await fsPromises.readFile(path, 'utf-8'))
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

    console.error('Error Log:', err)
}