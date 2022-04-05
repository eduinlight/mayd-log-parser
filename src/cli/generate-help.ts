import { CLIUsage } from '.'

export async function generateHelp () {
  return await CLIUsage.getInstance().getUsage(
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
      },
      {
        header: 'Examples',
        content: [
          '$ log-parser {bold --input} input.log {bold --output} output.json'
        ]
      }
    ]
  )
}
