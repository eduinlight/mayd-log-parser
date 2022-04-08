import fs, { ReadStream } from 'fs'
import readline from 'readline'
import { addService } from '../core/di'
import { NotFoundException, NotReadableException } from './exceptions'

export class InputReader {
  createStream (filePath: string): Promise<ReadStream> {
    return new Promise((resolve, reject) => {
      try {
        const stream = fs.createReadStream(filePath, 'utf-8')
        stream.once('error', (error) => {
          const isNotFound = error.message.search('ENOENT') === 0
          const isNotReadable = error.message.search('EACCES') === 0

          if (isNotFound) {
            reject(new NotFoundException(filePath))
          } else if (isNotReadable) {
            reject(new NotReadableException(filePath))
          } else {
            reject(error)
          }
        })
        stream.on('open', () => {
          resolve(stream)
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  async readFileLines (filePath: string): Promise<string[]> {
    try {
      const stream = await this.createStream(filePath)

      return new Promise((resolve, reject) => {
        const lines = []
        const rl = readline.createInterface({
          input: stream,
          crlfDelay: Infinity
        })

        rl.on('line', (line) => {
          lines.push(line)
        })

        rl.on('error', (error) => {
          reject(error)
        })

        rl.once('close', () => {
          resolve(lines)
        })
      })
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

addService(InputReader)
