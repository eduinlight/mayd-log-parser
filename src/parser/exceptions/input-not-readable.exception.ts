export class InputNotReadableException extends Error {
  constructor (input:string) {
    super(`Impossible to read input file: ${input}`)
  }
}
