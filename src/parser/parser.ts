import { addService } from '../core'
import { LineFormatSettingException } from './exceptions'
import { ParserSettings } from './types'

export class Parser {
  async parse<T> ({ lines, lineFormat, separator }: ParserSettings): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const response = []
      for (const line of lines) {
        const jsonStart = line.search('{')
        const firstParams = line.substring(0, jsonStart - separator.length)
        const jsonParam = line.substring(jsonStart)
        const lineValues = firstParams.split(separator)
        if (lineValues.length !== lineFormat.length - 1) {
          return reject(new LineFormatSettingException())
        }

        const newFirstLineFormat = []
        for (let i = 0; i < lineFormat.length - 1; i++) {
          newFirstLineFormat.push(lineFormat[i])
        }
        const firsParamsObject =
          newFirstLineFormat.map((parser, index) => parser.parse(lineValues[index]))
            .reduce((acc, curr) => ({ ...acc, ...curr }), {})

        response.push(
          {
            ...firsParamsObject,
            ...lineFormat[lineFormat.length - 1].parse(jsonParam)
          }
        )
      }
      resolve(response)
    })
  }
}

addService(Parser)
