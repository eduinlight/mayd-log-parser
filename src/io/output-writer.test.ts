import fs from 'fs'
import path from 'path'
import { NotFoundException, NotWritableException } from './exceptions'
import { OutputWriter } from './output-writer'

const testOutputPath = path.join(__dirname, 'output.txt')
const testOutputPath2 = path.join(__dirname, 'output2.txt')
const testOutputNotWritablePath = path.join(__dirname, 'output-not-writable.log')
const testOutputNotFoundPath = path.join('/some-dir-that-dont-exist', 'not-found-path.log')

beforeAll(() => {
  fs.closeSync(fs.openSync(testOutputPath, 'w'))
  fs.closeSync(fs.openSync(testOutputPath2, 'w'))

  fs.closeSync(fs.openSync(testOutputNotWritablePath, 'w'))
  fs.chmodSync(testOutputNotWritablePath, 0o400)
})

afterAll(() => {
  fs.unlinkSync(testOutputPath)
  fs.unlinkSync(testOutputPath2)
  fs.unlinkSync(testOutputNotWritablePath)
})

describe('OutputWriter', () => {
  test('open - OK', () => {
    const outputWriter = new OutputWriter()
    const promise = outputWriter.open(testOutputPath)
    expect(promise).resolves.toBeDefined()
  })

  test('writeText - OK', async () => {
    const outputWriter = new OutputWriter()
    await outputWriter.open(testOutputPath)

    const text = 'example text'
    await outputWriter.writeText(text)

    await outputWriter.close()

    expect(fs.readFileSync(testOutputPath).toString())
      .toStrictEqual(text)
  })

  test('writeLine - OK', async () => {
    const outputWriter = new OutputWriter()
    await outputWriter.open(testOutputPath2)

    const lines = ['line 1', 'line 2']
    for (const line of lines) {
      await outputWriter.writeLine(line)
    }

    await outputWriter.close()

    expect(fs.readFileSync(testOutputPath2).toString())
      .toStrictEqual(`${lines.join('\n')}\n`)
  })

  test('open - file not found error', async () => {
    try {
      const outputWriter = new OutputWriter()
      await outputWriter.open(testOutputNotFoundPath)
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException)
    }
  })

  test('open - no readable error', async () => {
    try {
      const outputWriter = new OutputWriter()
      await outputWriter.open(testOutputNotWritablePath)
    } catch (error) {
      expect(error).toBeInstanceOf(NotWritableException)
    }
  })
})
