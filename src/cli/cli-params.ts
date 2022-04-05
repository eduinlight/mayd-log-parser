import commandLineArgs from 'command-line-args'
import { addService } from '../core/di'
import { RequiredParamException, ParamUnknowException } from './exceptions'
import { Help, ParamFormat } from './types'

export class CLIParams {
  private checkRequiredParams (params: ParamFormat, parsedParams: any): string[] {
    return params.reduce((acc, current) => current.required && Boolean(parsedParams[current.name]) ? acc : [...acc, current.name], [])
  }

  getParams<T> (params: ParamFormat): Promise<T | Help> {
    return new Promise((resolve, reject) => {
      try {
        const parsedParams = commandLineArgs([...params, {
          name: 'help',
          type: Boolean,
          alias: 'h'
        }])
        const keys = Object.keys(parsedParams)
        const helpRequested = keys.indexOf('help') !== -1
        if (helpRequested) {
          return resolve({ help: true })
        }
        const requiredParams = this.checkRequiredParams(params, parsedParams)
        if (requiredParams.length > 0) {
          reject(new RequiredParamException(requiredParams))
        }
        resolve(parsedParams as T)
      } catch (err) {
        reject(new ParamUnknowException(err.message))
      }
    })
  }
}

addService(CLIParams)
