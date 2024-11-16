const stylesRegex = /^(?:#{2}|-)/
const categoryRegex = /^#{3}\s(.+)$/

let category: string

export function processData(data: string) {
    const lines = data.split('\n').filter(line => stylesRegex.test(line))
    let results = [] as any[]
    
    for (const line of lines) {
        if (categoryRegex.test(line)) category = line.match(categoryRegex)![1].toLowerCase()

        if (line.startsWith('-')) {
            const [key, value] = line.split(/:\s?/)

            if (
                category === 'primary' ||
                category === 'neutral'
            ) return results.push([category, [convertKey(key.replace('-', '')), value]])

            console.log('Could not find "primary", or "neutral" categories.')
        }
    }
    
    results = results.filter(Boolean)

    const colors = results.reduce((prev, curr) => {
        const [key, [prop, value]] = curr as [string, string[]]
    
        if (!isObjectEmpty(prev)) {
            const rest = (prev as {
                [x: string]: Object
            })[key]
    
            return {
                ...prev,
                [key]: {
                    ...rest,
                    [prop]: value
                }
            }
        }
    
        return {
            [key]: {
                [prop]: value
            }
        }
    }, {})

    console.log({
        colors
    })
}

const convertKey = (key: string) => key.toLowerCase().split(' ').join('-')
const isObjectEmpty = (obj: Object) => Object.keys(obj).length === 0