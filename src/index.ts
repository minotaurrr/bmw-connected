import { AxiosError } from 'axios';
import dotenv from 'dotenv';
dotenv.config();
import BMW from 'src/api';
import { Regions } from './constants';

(async () => {
  try {
    const opts = {
      username: process.env.CONNECTED_USERNAME!,
      password: process.env.CONNECTED_PASSWORD!,
      region: Regions.REST_OF_WORLD,
    };
    const bmw = new BMW(opts);
    await bmw.authenticate();
    const v = await bmw.getVehicles();
    console.log(v);
  } catch (error) {
    console.log((error as AxiosError)!.response?.data);
  }
})();