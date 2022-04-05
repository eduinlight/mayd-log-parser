import { OptionDefinition } from 'command-line-args'

export type ParamFormat = (OptionDefinition & {required?: boolean})[]
