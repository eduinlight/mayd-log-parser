import { generateHelp, generateParams, Help, ParserParams } from './cli'
import { Parser, StringParser, JsonObjectParser } from './parser'
import { getService, LogLevel } from './core'
import { InputReader, OutputWriter } from './io'
import { Log } from './core/types/log.interface'

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

    const parsedLines = await parser.parse<Log>({
      lines,
      separator: ' - ',
      lineFormat: [
        new StringParser('timestamp'),
        new StringParser('loglevel'),
        new JsonObjectParser(['err', 'transactionId'])
      ]
    })

    const filteredLines = parsedLines.filter(parsedLine =>
      parsedLine.loglevel === LogLevel.ERROR
    )

    const outputWriter = new OutputWriter()
    await outputWriter.open(output)
    await outputWriter.writeText(JSON.stringify(filteredLines))
    await outputWriter.close()
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
})()
