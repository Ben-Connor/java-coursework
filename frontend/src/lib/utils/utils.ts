import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => (
    twMerge(clsx(inputs))
)

export const sum = (numbers: number[]) => (
    numbers.reduce((acc, curr) => acc + curr, 0)
)

export const repeat = <T>(n: number, list: T[]) => {
    if (n <= 0) return []
    const result: T[] = []
    for (let i = 0; i < n; i++) {
        result.push(...list)
    }
    return result
}

export const title = (input: string): string => {
    const minorWords = new Set([
        "and",
        "or",
        "the",
        "a",
        "an",
        "in",
        "on",
        "at",
        "to",
        "for",
        "by",
        "with",
        "of",
    ])
  
    return input
        .split(/[_\-\s]+/)
        .map((word, index) => {
            const lowerWord = word.toLowerCase()
            if (index === 0 || !minorWords.has(lowerWord)) {
                return word.charAt(0).toUpperCase() + lowerWord.slice(1)
            }
            return lowerWord
        })
        .join(" ")
}

export const initials = (name: string): string => {
    return name
        .split(/\s+/)
        .filter(word => word.length > 0)
        .map(word => word[0])
        .join("")
        .toUpperCase()
}

export const roundTo = (n: number, decimalPlaces: number) => {
    const factor = Math.pow(10, decimalPlaces)
    return Math.round(n * factor) / factor
}

export const deduplicate = <T>(items: T[], predicate: (a: T, b: T) => boolean) => (
    items.reduce<T[]>((acc, current) => {
        const exists = acc.some((item) => predicate(item, current))
        if (!exists) {
            acc.push(current)
        }
        return acc
    }, [])
)

export const zip = <A, B>(a: A[], b: B[]) => {
    console.log("In zip", a, b)
    const length = Math.min(a.length, b.length)
    const result: [A, B][] = []
    for (let i = 0; i < length; i++) {
        result.push([a[i], b[i]])
    }
    return result
}

export const stringToIntHash = (str: string) => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        const chr = str.charCodeAt(i)
        hash = (hash << 5) - hash + chr
        hash |= 0
    }
    return Math.abs(hash);
}
