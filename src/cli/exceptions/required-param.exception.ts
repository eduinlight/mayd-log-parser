export class RequiredParamException extends Error {
  constructor (params: string[]) {
    super(`Required params: ${params.join(', ')}`)
  }
}
