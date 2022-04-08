import { ValueParser } from '../value-parser'

export interface ParserSettings {
  lines: string[];
  lineFormat: ValueParser[];
  separator: string;
}
