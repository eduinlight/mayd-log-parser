export class NotFoundException extends Error {
  constructor (input:string) {
    super(`The file ${input} do not exist`)
  }
}
