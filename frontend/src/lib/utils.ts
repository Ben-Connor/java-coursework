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
