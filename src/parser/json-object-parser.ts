import { ValueParser } from './value-parser'

export class JsonObjectParser extends ValueParser {
  private keepKeys?: string[]

  constructor (keepKeys?: string[]) {
    super()
    this.keepKeys = keepKeys
  }

  parse (value: string) {
    let obj = JSON.parse(value)
    if (this.keepKeys) {
      obj = Object.keys(obj).reduce((acc, key: string) => ({
        ...acc,
        ...(this.keepKeys.includes(key) ? { [key]: obj[key] } : {})
      }), {})
    }
    return obj
  }
}
