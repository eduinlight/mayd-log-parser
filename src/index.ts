import { generateHelp, generateParams, Help, ParserParams } from './cli'
import { Parser } from './parser'
import { getService } from './core/di'
import { InputReader, OutputWriter } from './io'

(async function main () {
  try {
    const parser = getService<Parser>(Parser)
    const inputReader = getService<InputReader>(InputReader)
    const helpStr = await generateHelp()
    const params = await generateParams()

    if (params === null) {
      console.log(helpStr)
      process.exit(1)
    }

    if ((params as Help).help) {
      console.log(helpStr)
      process.exit(0)
    }

    const { input, output } = params as ParserParams

    const lines = await inputReader.readFileLines(input)

    const parsedLines = await parser.parse(lines)

    const outputWriter = new OutputWriter()
    await outputWriter.open(output)
    await outputWriter.writeText(JSON.stringify(parsedLines))
    await outputWriter.close()
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
})()
