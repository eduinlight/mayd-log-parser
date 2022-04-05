import commandLineUsage from 'command-line-usage'
import { UsageFormat } from './types/'

let instance: CLIUsage | undefined

export class CLIUsage {
  public static getInstance () {
    if (!instance) {
      instance = new CLIUsage()
    }
    return instance
  }

  getUsage (params: UsageFormat): Promise<string> {
    return Promise.resolve(commandLineUsage(params))
  }
}
