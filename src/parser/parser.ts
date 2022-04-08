import { addService } from '../core/di'

export class Parser {
  async parse<T> (logs: string[]): Promise<T[]> {
    return Promise.resolve([{}])
  }
}

addService(Parser)
