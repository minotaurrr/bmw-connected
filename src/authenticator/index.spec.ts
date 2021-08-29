import axios from 'axios';
import Authenticator from 'src/authenticator';
import { Regions } from 'src/constants';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Authenticator', () => {
  let authenticator: Authenticator;

  describe('constructor', () => {
    beforeEach(() => {
      const opts = {
        username: 'test',
        password: 'test',
        region: Regions.NORTH_AMERICA,
      };
      authenticator = new Authenticator(opts);
    });

    it('should assign correct values', () => {
      expect(authenticator.region).toEqual(Regions.NORTH_AMERICA);
    });
  });

  describe('getRequestParams', () => {
    it('should return request params for NORTH_AMERICA', () => {
      const opts = {
        region: Regions.NORTH_AMERICA,
        username: 'test',
        password: 'test',
      };
      authenticator = new Authenticator(opts);

      const params = authenticator.getRequestParams();
      const expected = {
        base: 'https://b2vapi.bmwgroup.us/webapi/v1',
        auth: 'https://b2vapi.bmwgroup.us/gcdm',
        authorization: 'Basic ZDc2NmI1MzctYTY1NC00Y2JkLWEzZGMtMGNhNTY3MmQ3ZjhkOjE1ZjY5N2Y2LWE1ZDUtNGNhZC05OWQ5LTNhMTViYzdmMzk3Mw==',
      };
      expect(params).toEqual(expected);
    });

    it('should return request params for REST_OF_WORLD', () => {
      const opts = {
        username: 'test',
        password: 'test',
        region: Regions.REST_OF_WORLD,
      };
      authenticator = new Authenticator(opts);

      const params = authenticator.getRequestParams();
      const expected = {
        base: 'https://b2vapi.bmwgroup.com/webapi/v1',
        auth: 'https://customer.bmwgroup.com/gcdm',
        authorization: 'Basic ZDc2NmI1MzctYTY1NC00Y2JkLWEzZGMtMGNhNTY3MmQ3ZjhkOjE1ZjY5N2Y2LWE1ZDUtNGNhZC05OWQ5LTNhMTViYzdmMzk3Mw==',
      };
      expect(params).toEqual(expected);
    });
  });

  describe('getOAuthHeaders', () => {
    it('should get auth headers', () => {
      const opts = {
        username: 'test',
        password: 'test',
        region: Regions.REST_OF_WORLD,
      };
      authenticator = new Authenticator(opts);
      const headers = authenticator.getOAuthHeaders();
      expect(headers).toEqual({
        'Accept-Encoding': 'gzip',
        Authorization: 'Basic ZDc2NmI1MzctYTY1NC00Y2JkLWEzZGMtMGNhNTY3MmQ3ZjhkOjE1ZjY5N2Y2LWE1ZDUtNGNhZC05OWQ5LTNhMTViYzdmMzk3Mw==',
        'Content-Length': '121',
        'Content-Type': 'application/x-www-form-urlencoded',
        Credentials: 'nQv6CqtxJuXWP74xf3CJwUEP:1zDHx6un4cDjybLENN3kyfumX2kEYigWPcQpdvDRpIBk7rOJ',
        Host: 'customer.bmwgroup.com',
      });
    });
  });

  describe('getAccessToken', () => {
    const opts = {
      region: Regions.NORTH_AMERICA,
      username: 'test',
      password: 'test',
    };
    authenticator = new Authenticator(opts);

    beforeAll(() => {
      mockedAxios.post.mockResolvedValue({
        data: {
          access_token: 'token',
          expires_in: 'expiresIn',
        },
      });
    });

    it('returns access token data', async () => {
      const result = await authenticator.getAccessToken();
      expect(result).toMatchObject({
        token: 'token',
        expiresIn: 'expiresIn',
      });
    });
  });
});
