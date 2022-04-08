import { getService } from '../core/di'
import { CLIParams } from './cli-params'
import { Help, ParserParams } from './types'

const cliParamsService = getService<CLIParams>(CLIParams)

export async function generateParams (): Promise<ParserParams | Help | null> {
  try {
    const params = await cliParamsService.getParams<ParserParams>(
      [
        {
          name: 'input',
          type: String,
          alias: 'i',
          required: true
        },
        {
          name: 'output',
          type: String,
          alias: 'o',
          required: true
        }
      ])

    if ((params as Help).help) {
      return { help: true }
    } else {
      return params
    }
  } catch (error) {
    return null
  }
}
