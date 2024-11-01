import { convertToHyphenCase, handleReadFile } from "./utility"

const readFile = handleReadFile('./assets/style-guide.md')

readFile(function(data) {
    const regex = /^(?:#{2}|-)/
    const matches = data.split('\n').map(line => regex.test(line) && line)

    if (!matches.length) {
        console.log('No matches were found!')
        return
    }

    this.emit('matched', matches.filter(Boolean))
})
.on('error', err => {
    if (err.code === 'ENOENT') {
        console.log('No such file exists!')
        return
    }

    console.error(err)
})
.on('matched', (results: string[]) => {
    const regex = /-\s([\w\s]+):\s(.+)/

    results.forEach(result => {
        const match = regex.exec(result)
        
        if (match) {
            const [, key, value] = match
            console.log(`${convertToHyphenCase(key)}: ${value}`)
        }

        if (!match) console.log(result)
    })
})