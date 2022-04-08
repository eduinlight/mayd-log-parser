import { ValueParser } from './value-parser'

export class StringParser extends ValueParser {
  private key: string;
  constructor (key: string) {
    super()
    this.key = key
  }

  parse (value: string) {
    return { [this.key]: value }
  }
}
