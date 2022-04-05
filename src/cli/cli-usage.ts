import commandLineUsage from 'command-line-usage'
import { addService } from '../core/di'
import { UsageFormat } from './types/'

export class CLIUsage {
  getUsage (params: UsageFormat): Promise<string> {
    return Promise.resolve(commandLineUsage(params))
  }
}

addService(CLIUsage)
