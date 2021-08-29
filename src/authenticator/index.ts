import querystring from 'query-string';
import dayjs from 'dayjs';
import axios from 'axios';
import { RequestParams } from 'src/constants';

interface AuthOptions {
  region: Region;
  username: string;
  password: string;
}

class Authenticator {
  public region: Region;
  private username: string;
  private password: string;

  constructor({ region, username, password }: AuthOptions) {
    this.region = region;
    this.username = username;
    this.password = password;
  }

  async getAccessToken() {
    const values = {
      scope: 'authenticate_user vehicle_data remote_services',
      grant_type: 'password',
      username: this.username,
      password: this.password,
    };
    const url = `${this.getRequestParams().auth}/oauth/token`;
    const data = querystring.stringify(values);
    const headers = this.getOAuthHeaders();
    const res = await axios.post(url, data, { headers });

    return { token: res.data.access_token, retrievedAt: dayjs().toISOString(), expiresIn: res.data.expires_in };
  }

  getRequestParams() {
    return RequestParams[this.region];
  }

  getOAuthHeaders() {
    const { auth, authorization } = this.getRequestParams();
    const headers = {
      Credentials: 'nQv6CqtxJuXWP74xf3CJwUEP:1zDHx6un4cDjybLENN3kyfumX2kEYigWPcQpdvDRpIBk7rOJ',
      'Accept-Encoding': 'gzip',
      'Content-Length': '121',
      'Content-Type': 'application/x-www-form-urlencoded',
      Host: new URL(auth).hostname,
      Authorization: authorization,
    };
  
    return headers;
  }
}

export default Authenticator;
