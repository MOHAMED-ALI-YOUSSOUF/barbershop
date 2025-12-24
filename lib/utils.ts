import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { nanoid } from 'nanoid'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function generateCancellationToken(): string {
  return nanoid(32)
}

export function formatPrice(price: number): string {
  return `${price.toLocaleString('fr-FR')} DJF`
}

export function formatPhoneNumber(phone: string): string {
  // Format: +253 77 XX XX XX
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.startsWith('253')) {
    const number = cleaned.slice(3)
    return `+253 ${number.slice(0, 2)} ${number.slice(2, 4)} ${number.slice(4, 6)} ${number.slice(6, 8)}`
  }
  return phone
}

export function isValidPhoneNumber(phone: string): boolean {
  const regex = /^\+?253\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/
  return regex.test(phone)
}