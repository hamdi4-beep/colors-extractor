import { promises as fsPromise } from "fs";

readFile('./assets/style-guide.md', (data: string) => {
    const lines = data.split('\n').filter(line => /^(?:#{2}|-)/.test(line))
    const styles = [] as string[][]
    
    lines.forEach(line => {
        let match

        if (match = line.match(/-\s([\w\s]+):\s(.+)/)) {
            const [_, key, value] = match
            styles.push([convertKey(key), value])
            return
        }

        console.log(line)
    })

    console.log(styles.reduce((prev, [key, value]) => {
        return {
            ...prev,
            [key]: value
        }
    }, {}))
})

async function readFile(path: string, cb: Function) {
    try {
        const result = await fsPromise.readFile(path, 'utf-8')
        cb(result)
    } catch (err: any) {
        if (err.code === 'ENOENT') {
            console.log('No such file exists.')
            return
        }

        console.error(err)
    }
}

const convertKey = (key: string) => key.toLowerCase().split(' ').join('-')