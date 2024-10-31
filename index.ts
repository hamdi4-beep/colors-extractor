import { readFile } from "./utility"

const processFile = readFile('./assets/style-guide.md')

processFile(function(data) {
    const lines = data.split('\n')

    const matches = lines.map(it => {
        const match = it.match(/^#{2}\s(\w+)/)

        if (match) {
            const [, header] = match
            return header
        }
    })

    this.emit('done', matches?.filter(Boolean))
})
.on('error', err => {
    if (err.code === 'ENOENT') {
        console.log('No such file exists!')
        return
    }

    console.error(err)
})
.on('done', results => {
    processFile(parseData)

    function parseData(data: string) {
        const lines = data.split('\n')
        const regex = /-\s([\w\s]+):\s(.+)/

        const matches = lines.map(line => {
            const match = line.match(regex)

            if (match) {
                const [, key, value] = match

                return {
                    [key]: value
                }
            }
        })

        console.log(matches.filter(Boolean))
    }
})