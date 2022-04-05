export class OutputFileNotWritableException extends Error {
  constructor (output: string) {
    super(`Impossible to write output file: ${output}`)
  }
}
