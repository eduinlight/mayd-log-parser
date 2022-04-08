import { LogLevel } from './log-level.enum'

export interface Log{
  timestamp: string | Date;
  transactionId: string;
  loglevel: LogLevel;
  err?: string;
}
