import { decryptStr, generateTOTP } from './string-helpers'

export interface ICollection {
    user_id: string
    issuer: string
    user_identity: string
    secret_key: string
    algorithm: string
    token_type: string
    period: string
    digits: string
    token?: string
}

/**
 * Function to sort alphabetically an array of objects by some specific key.
 *
 * @param {String} prop Key of the object to sort.
 * @param {Boolean} ascending If true, sort ascending. If false, sort descending.
 */
export function sortObjectsByProp(objectsArr: any[], prop: string | number, ascending: boolean = true) {
    let objectsHaveProp = objectsArr.every((object) => object.hasOwnProperty(prop))
    if (objectsHaveProp) {
        let newObjectsArr = objectsArr.slice()
        newObjectsArr.sort((a, b) => {
            if (isNaN(Number(a[prop]))) {
                let textA = a[prop].toUpperCase(),
                    textB = b[prop].toUpperCase()
                if (ascending) {
                    return textA < textB ? -1 : textA > textB ? 1 : 0
                } else {
                    return textB < textA ? -1 : textB > textA ? 1 : 0
                }
            } else {
                return ascending ? a[prop] - b[prop] : b[prop] - a[prop]
            }
        })
        return newObjectsArr
    }
    return objectsArr
}

// Group array single dimention by the alphabetical key
export const groupArrayByAlphabet = (arr: any[]) => {
    return arr.reduce((acc, cur) => {
        const firstLetter = cur[0].toUpperCase()
        return { ...acc, [firstLetter]: [...(acc[firstLetter] || []), cur] }
    }, {})
}

/**
 * Group array object by the alphabetical key.
    {
        A: [ { name: 'Abigail', age: '25' } ],
        B: [ { name: 'Brianna', age: '25' } ],
        C: [ { name: 'Camila', age: '24' } ],
        D: [ { name: 'David', age: '22' } ]
    }
*/
export function groupArrayObjectByAlphabet(arr: any[]) {
    return arr.reduce((r, e) => {
        // get first letter of name of current element
        let alphabet = e.issuer[0].toUpperCase() // <- change `e.name` to whatever key you want
        // if there is no property in accumulator with this letter create it
        if (!r[alphabet]) r[alphabet] = [e]
        // if there is push current element to children array for that letter
        // else r[alphabet].record.push(e)
        // return accumulator
        return r
    }, {})
}

/**
 * Group array object by the alphabetical key
 * and return as array of objects.
 */
export function groupArrayObjectByAlphabetAsObject(arr: any[]) {
    let data = arr.reduce((r, e) => {
        // get first letter of name of current element
        let alphabet = e.name[0]

        // if there is no property in accumulator with this letter create it
        if (!r[alphabet]) r[alphabet] = { alphabet, record: [e] }
        // if there is push current element to children array for that letter
        else r[alphabet].record.push(e)

        // return accumulator
        return r
    }, {})

    return Object.values(data)
}

// TODO: fix this types
export async function parseCollections(data: any[]) {
    const arr = data.map(async (item) => {
        // Decrypt sensitive data
        const issuer = await decryptStr(item.issuer)
        const user_identity = await decryptStr(item.user_identity)
        const secret_key = await decryptStr(item.secret_key)
        const backup_code = await decryptStr(item.backup_code)

        // Generate TOTP token
        const token = await generateTOTP({
            secret: secret_key,
            period: item.period,
            digits: item.digits,
            algorithm: item.algorithm,
        })

        const result = {
            issuer,
            user_identity,
            secret_key,
            backup_code,
            algorithm: item.algorithm,
            token_type: item.token_type,
            period: item.period,
            digits: item.digits,
            token,
        }

        return result
    })

    const newData = await Promise.all(arr)
    const sortedData = sortObjectsByProp(newData, 'issuer')
    const groupedData = groupArrayObjectByAlphabet(sortedData)

    return groupedData
}
