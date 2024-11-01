import { convertToHyphenCase, readFile } from "./utility"

const processFile = readFile('./assets/style-guide.md')

processFile(function(data) {
    const lines = data.split('\n')
    const matches = lines.map(line => /^(?:#{2}|-)/.test(line) && line)

    if (!matches.length) {
        console.log('No matches were found!')
        return
    }

    this.emit('done', matches.filter(Boolean))
})
.on('error', err => {
    if (err.code === 'ENOENT') {
        console.log('No such file exists!')
        return
    }

    console.error(err)
})
.on('done', (results: string[]) => {
    results.forEach(result => {
        const match = /-\s([\w\s]+):\s(.+)/.exec(result)
        console.log((match ? `${convertToHyphenCase(match[1])}: ${match[2]}` : null) || result)
    })
})