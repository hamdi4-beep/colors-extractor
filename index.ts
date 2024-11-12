import { promises as fsPromise } from "fs";

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

function processData(data: string) {
    const stylesRegex = /^(?:#{2}|-)/
    const categoryRegex = /^#{3}\s(.+)$/

    const lines = data.split('\n').filter(line => stylesRegex.test(line))
    let category: string
    
    for (let i = 0; i < lines.length; i++) {
        if (categoryRegex.test(lines[i])) category = lines[i].match(categoryRegex)![1]
        if (lines[i].startsWith('-')) extractValues(lines[i])
    }

    function extractValues(line: string) {
        const [key, value] = line.split(/:\s?/)

        if (
            category === 'Primary' ||
            category === 'Neutral'
        ) console.log([category, [convertKey(key.replace('-', '')), value]])
    }
}

const convertKey = (key: string) => key.toLowerCase().split(' ').join('-')