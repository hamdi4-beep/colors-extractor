const stylesRegex = /^(?:#{2}|-)/
const categoryRegex = /^#{3}\s(.+)$/

let category: string

export function getColors(data: string) {
    const values = extractValues(data.split('\n').filter(line => stylesRegex.test(line)))

    if (!values.length) {
        console.log('None of the targeted categories were found.')
        return
    }

    return {
        colors: convertArrToObject(values)
    }
}

const convertKey = (key: string) => key.toLowerCase().split(' ').join('-')
const isObjectEmpty = (obj: Object) => Object.keys(obj).length === 0

const convertArrToObject = (arr: (string | string[])[][]) => arr.reduce((prev: Object, curr) => {
    const [key, [prop, value]] = curr as [string, string[]]

    if (isObjectEmpty(prev)) return {
        [key]: {
            [prop]: value
        }
    }

    const colors = (prev as {
        [x: string]: Object
    })[key]

    return {
        ...prev,
        [key]: {
            ...colors,
            [prop]: value
        }
    }
}, {})

function extractValues(lines: string[]) {
    const results = [] as [string, string[]][]

    for (const line of lines) {
        if (categoryRegex.test(line)) category = line.match(categoryRegex)![1].toLowerCase()
        if (line.startsWith('-')) addValue(line)
    }

    return results.filter(Boolean)

    function addValue(line: string) {
        const [key, value] = line.split(/:\s?/)

            if (
                category === 'primary' ||
                category === 'neutral'
            ) results.push([category, [convertKey(key.replace('-', '')), value]])
    }
}