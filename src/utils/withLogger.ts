import { Logger } from 'tslog';

interface WithLogger<T> {
  debug: boolean | undefined;
  operation: () => Promise<T>;
}

const logger = new Logger({ name: 'connected-drive-log' });

export const withLogger = async <T extends unknown>(opts: WithLogger<T>) => {
  const result = await opts.operation();
  if (opts.debug) logger.debug(result);
  return result;
}