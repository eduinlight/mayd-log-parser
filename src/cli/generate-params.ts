import { ParserParams } from '../parser'
import { CLIParams } from './cli-params'
import { ParamUnknowException, RequiredParamException } from './exceptions'
import { generateHelp } from './generate-help'
import { Help } from './types'

export async function generateParams (): Promise<ParserParams | null> {
  const helpStr = await generateHelp()
  try {
    const params = await CLIParams.getInstance().getParams<ParserParams>(
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
      console.log(helpStr)
      return null
    } else {
      return params as ParserParams
    }
  } catch (err) {
    if (err instanceof ParamUnknowException || err instanceof RequiredParamException) {
      console.log(helpStr)
    }
    return null
  }
}
