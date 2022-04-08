import fs from 'fs'
import path from 'path'
import { getService } from '../core'
import { NotFoundException, NotReadableException } from './exceptions'
import { InputReader } from './input-reader'

const inputReader = getService<InputReader>(InputReader)

const testInputPath = path.join(__dirname, 'input.txt')
const testInputNotReadablePath = path.join(__dirname, 'input-not-readable')
const testInputNotFoundPath = path.join(__dirname, 'not-found-path.log')
const lines = ['line 1', 'line 2', 'line 3']

beforeAll(() => {
  fs.writeFileSync(testInputPath, lines.join('\n'))

  fs.writeFileSync(testInputNotReadablePath, lines.join('\n'))
  fs.chmodSync(testInputNotReadablePath, '200')
})

afterAll(() => {
  fs.unlinkSync(testInputPath)
  fs.unlinkSync(testInputNotReadablePath)
})

describe('InputReader', () => {
  test('readFileLines OK', async () => {
    const response = await inputReader.readFileLines(testInputPath)
    expect(response).toStrictEqual(lines)
  })

  test('readFileLines file not found error', () => {
    const promise = inputReader.readFileLines(testInputNotFoundPath)
    expect(promise).rejects.toBeInstanceOf(NotFoundException)
  })

  test('readFileLines no readable error', () => {
    const promise = inputReader.readFileLines(testInputNotReadablePath)
    expect(promise).rejects.toBeInstanceOf(NotReadableException)
  })
})
