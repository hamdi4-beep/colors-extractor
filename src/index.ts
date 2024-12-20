import { createReadStream, createWriteStream } from 'fs'
import { basename, join } from 'path'
import { pipeline, Transform } from 'stream'

const getFileExtension = (filename: string) => filename.split('.').pop()?.toLowerCase()
const filename = basename(process.argv[2] ?? '')

if (!filename) {
    console.error('Expected a filename argument.')
    process.exit(1)
}

if (getFileExtension(filename) !== 'md') {
    console.log('Only markdown files are accepted.')
    process.exit(1)
}

const filterByRegex = (regex: RegExp) => new Transform({
    objectMode: true,
    transform(chunk, encoding = 'utf8', callback) {
        const lines = (chunk + '').split('\n')
        callback(null, lines.filter(line => regex.test(line)).join('\n'))
    }
})

pipeline(
    createReadStream(join('files', filename)),
    filterByRegex(/-\s(?:[\S\s]+):/),
    createWriteStream('results.txt'),
    (err: any) => {
        if (err) {
            console.error(err)
            process.exit(1)
        }

        console.log('The operation was a success.')
    }
)