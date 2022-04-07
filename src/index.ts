import { generateHelp, generateParams, Help } from './cli'

(async function main () {
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

  console.log(params)
})()
