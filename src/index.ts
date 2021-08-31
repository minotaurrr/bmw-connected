import { AxiosError } from 'axios';
import dotenv from 'dotenv';
dotenv.config();
import BMW from 'src/api';
import { Logger } from 'tslog';
import Authenticator from './authenticator';
import { Regions } from './constants';

(async () => {
  try {
    const opts = {
      username: process.env.CONNECTED_USERNAME!,
      password: process.env.CONNECTED_PASSWORD!,
      region: Regions.REST_OF_WORLD,
    };
    const authenticator = new Authenticator(opts);
    const log = new Logger({ name: 'connected-drive-log', type: 'pretty' });
    const bmw = new BMW({ authenticator, log });

    await bmw.authenticate();
    const v = await bmw.getVehicles();
    console.log(JSON.stringify(v, null, 2));
  } catch (error) {
    console.log((error as AxiosError)!.response?.data);
  }
})();
