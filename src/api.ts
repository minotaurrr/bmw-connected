import Authenticator from 'src/authenticator';
import axios from 'axios';
import { getRequestHeaders, getVehicleURL } from './utils';

class BMWConnectedDrive {
  public authenticator: Authenticator;
  public authentication?: Authentication;
  constructor(opts: AuthOptions) {
    this.authenticator = new Authenticator(opts);
  }

  async authenticate() {
    this.authentication = await this.authenticator.getAccessToken();
  }

  async getVehicles() {
    if (!this.authentication) throw new Error('Missing access token');
    const url = getVehicleURL(this.authenticator.region);
    const headers = getRequestHeaders(this.authentication.token);
    const { data } = await axios.get(url, { headers });
    return data;
  }
}

export default BMWConnectedDrive;