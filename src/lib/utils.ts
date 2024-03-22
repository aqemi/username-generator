import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}
