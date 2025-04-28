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
