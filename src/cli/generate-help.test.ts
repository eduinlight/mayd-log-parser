import { generateHelp } from './generate-help'

describe('generateHelp function', () => {
  test('Function return a string', async () => {
    expect(typeof await generateHelp()).toBe('string')
  })
})
