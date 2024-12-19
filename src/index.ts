import { createReadStream, createWriteStream } from 'fs'
import { join } from 'path'
import { pipeline, Transform } from 'stream'

const filterByRegex = (regex: RegExp) => {
    const results = [] as string[]

    return new Transform({
        objectMode: true,
        transform(chunk, encoding, callback) {
            const lines = (chunk + '').split('\n')
            results.push(...lines.filter(line => regex.test(line)))
            callback()
        },
        flush(callback) {
            this.push(JSON.stringify(results, null, '\t'))
            callback()
        }
    })
}

pipeline(
    createReadStream(join('files', process.argv[2] ?? '')),
    filterByRegex(/-\s(?:[\S\s]+):/),
    createWriteStream(join('files', 'results.txt')),
    (err: any) => {
        if (err) {
            console.error(err)
            process.exit(1)
        }

        console.log('Created a text file called "results" inside the files directory.')
    }
)