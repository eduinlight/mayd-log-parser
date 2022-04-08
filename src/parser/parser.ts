import { addService } from '../core'
import { LineFormatSettingException } from './exceptions'
import { ParserSettings } from './types'

export class Parser {
  async parse<T> ({ lines, lineFormat, separator }: ParserSettings): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const response = []
      for (const line of lines) {
        const lineValues = line.split(separator)

        if (lineValues.length !== lineFormat.length) {
          return reject(new LineFormatSettingException())
        }

        response.push(
          lineFormat.map((parser, index) => parser.parse(lineValues[index]))
            .reduce((acc, curr) => ({ ...acc, ...curr }), {})
        )
      }
      resolve(response)
    })
  }
}

addService(Parser)
