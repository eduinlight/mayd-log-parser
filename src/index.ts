import { generateParams } from './cli'

async function main () {
  const params = await generateParams()

  console.log(params)
}

main()
