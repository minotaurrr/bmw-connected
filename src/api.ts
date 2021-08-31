import { Logger } from 'tslog';
import Authenticator from 'src/authenticator';
import { getRequest, getVehicleURL } from './utils';

interface Options {
  authenticator: Authenticator;
  log: Logger;
  debug?: boolean;
}
class BMWConnectedDrive {
  public authenticator: Authenticator;
  public authentication?: Authentication;
  public debug;
  public log: Logger;
  constructor(opts: Options) {
    this.authenticator = opts.authenticator;
    this.log = opts.log;
    this.debug = opts.debug;
  }

  async authenticate() {
    this.authentication = await this.authenticator.getAccessToken();
    if (this.debug) this.log.debug(this.authentication);
  }

  async getVehicles() {
    if (!this.authentication) throw new Error('Missing access token');
    const url = getVehicleURL(this.authenticator.region);
    const data = await getRequest({ token: this.authentication.token, url });
    if (this.debug) this.log.debug(data);
    return data;
  }
}

export default BMWConnectedDrive;
