import fs, { WriteStream } from 'fs'
import { NotFoundException, NotWritableException } from './exceptions'

export class OutputWriter {
  private stream: WriteStream

  open (filePath: string) {
    return new Promise((resolve, reject) => {
      this.stream = fs.createWriteStream(filePath, { flags: 'a', encoding: 'utf-8' })
      this.stream.once('error', (error) => {
        const isNotFound = error.message.search('ENOENT') === 0
        const isNotWritable = error.message.search('EACCES') === 0
        if (isNotFound) {
          reject(new NotFoundException(filePath))
        } else if (isNotWritable) {
          reject(new NotWritableException(filePath))
        } else {
          reject(error)
        }
      })
      this.stream.once('open', () => {
        resolve(this)
      })
    })
  }

  writeText (test: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.stream.write(`${test}`, (error) => {
        if (error) reject(error)
        resolve()
      })
    })
  }

  writeLine (test: string): Promise<void> {
    return this.writeText(`${test}\n`)
  }

  close (): Promise<void> {
    return new Promise((resolve, reject) => {
      this.stream.close((error) => {
        if (error) reject(error)
        resolve()
      })
    })
  }
}
