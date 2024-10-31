import { readFile } from "./utility"

const processFile = readFile('./assets/style-guide.md')

processFile(function(data) {
    const result = data.match(/#+?\s(\w+)/g)

    const matches = result?.map((it, i) => {
        const match = it.match(/^#{2}\s(\w+)/)
        
        if (match) {
            const [, key] = match
            this.emit('found', key, i)

            return key
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
    const layout = results.shift()
    processFile(parseData)

    function parseData(data: string) {
        const matches = data.match(/-\s(\w+):\s(\w+)/)

        if (matches) {
            const [, key, value] = matches

            console.log([layout, {
                [key]: value
            }])
        }
    }
})