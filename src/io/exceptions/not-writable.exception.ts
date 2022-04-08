export class NotWritableException extends Error {
  constructor (output: string) {
    super(`Impossible to write to file: ${output}`)
  }
}
