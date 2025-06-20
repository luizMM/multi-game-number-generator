// Simplified version without tailwind-merge if you don't want to install it
export function cn(...inputs) {
  return inputs.filter(Boolean).join(" ")
}

// OR if you install tailwind-merge, use this version:
// import { clsx } from "clsx"
// import { twMerge } from "tailwind-merge"
//
// export function cn(...inputs) {
//   return twMerge(clsx(inputs))
// }
