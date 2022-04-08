import { getService } from '../core'
import { CLIUsage } from './cli-usage'

const cliUsageService = getService<CLIUsage>(CLIUsage)

export async function generateHelp () {
  return await cliUsageService.getUsage(
    [
      {
        header: 'Log Parser App',
        content: `Transform logs {underline from format}: 
<ISO Date> - <Log Level> - \\{"transactionId: "<UUID>", "details": "<message event/action description>", "err": "<Optionall, error description>", ...<additional log information>\\}
[\\{"timestamp": <Epoch Unix Timestamp>, "loglevel": "<loglevel>", "transactionId: "<UUID>", "err": "<Error message>" \\}]
{underline to}:
        `
      },
      {
        header: 'Example',
        content: [
          '$ log-parser {bold --input} input.log {bold --output} output.json'
        ]
      },
      {
        header: 'Options',
        optionList: [
          {
            name: 'input',
            alias: 'i',
            typeLabel: '{underline input.log}',
            description: 'The logs to be parsed.'
          },
          {
            name: 'output',
            alias: 'o',
            typeLabel: '{underline output.json}',
            description: 'The output file to save parsed logs.'
          },
          {
            name: 'help',
            alias: 'h',
            description: 'Print this usage guide.'
          }
        ]
      }
    ]
  )
}
