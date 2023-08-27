import { createInterface } from 'readline'

export const prompt = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})
