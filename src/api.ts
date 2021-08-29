import { Logger } from 'tslog';
import Authenticator from 'src/authenticator';
import axios from 'axios';
import { getRequestHeaders, getVehicleURL } from './utils';

class BMWConnectedDrive {
  public authenticator: Authenticator;
  public authentication?: Authentication;
  public debug;
  public log: Logger;
  constructor(opts: AuthOptions) {
    this.authenticator = new Authenticator(opts);
    this.log = new Logger({ name: 'connected-drive-log', type: 'pretty' });
    this.debug = opts.debug;
  }

  async authenticate() {
    this.authentication = await this.authenticator.getAccessToken();
    if (this.debug) this.log.debug(this.authentication);
  }

  async getVehicles() {
    if (!this.authentication) throw new Error('Missing access token');
    const url = getVehicleURL(this.authenticator.region);
    const headers = getRequestHeaders(this.authentication.token);
    const { data } = await axios.get(url, { headers });
    if (this.debug) this.log.debug(data);
    return data;
  }
}

export default BMWConnectedDrive;