export class NotReadableException extends Error {
  constructor (input:string) {
    super(`Impossible to read the file: ${input}`)
  }
}
