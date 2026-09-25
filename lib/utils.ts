import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names with clsx and resolves Tailwind conflicts with twMerge.
 * @param inputs List of class names or conditional class objects
 * @returns Normalized single class string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
