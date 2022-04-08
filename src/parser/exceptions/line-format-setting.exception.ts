export class LineFormatSettingException extends Error {
  constructor () {
    super('lineFormat setting array length and line split with separator length do not match')
  }
}
