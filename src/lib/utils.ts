import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

export function randomElements<T>(arr: T[], num = 1): T[] {
  if (num <= 0 || arr.length === 0) {
    return [];
  }

  const result = new Set<T>();
  while (result.size < Math.min(num, arr.length)) {
    const randomIndex = random(0, arr.length);
    if (!result.has(arr[randomIndex])) {
      result.add(arr[randomIndex]);
    }
  }

  return Array.from(result);
}
