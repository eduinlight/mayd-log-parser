export class InputNotFoundException extends Error {
  constructor (input:string) {
    super(`The inut file ${input} do not exist`)
  }
}
