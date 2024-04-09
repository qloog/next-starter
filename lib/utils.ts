import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// gen passwordToSalt
export function passwordToSalt(password: string) {
  let salt = ""
  for (let i = 0; i < password.length; i++) {
    salt += password.charCodeAt(i).toString(16)
  }
  return salt
}
