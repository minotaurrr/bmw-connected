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
        auth: 'https://b2vapi.bmwgroup.us/gcdm/oauth/authenticate',
        token: 'https://b2vapi.bmwgroup.us/gcdm/oauth/token',
        authorization: 'Basic NTQzOTRhNGItYjZjMS00NWZlLWI3YjItOGZkM2FhOTI1M2FhOmQ5MmYzMWMwLWY1NzktNDRmNS1hNzdkLTk2NmY4ZjAwZTM1MQ==',
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
        auth: 'https://customer.bmwgroup.com/gcdm/oauth/authenticate',
        token: 'https://customer.bmwgroup.com/gcdm/oauth/token',
        authorization: 'Basic MzFjMzU3YTAtN2ExZC00NTkwLWFhOTktMzNiOTcyNDRkMDQ4OmMwZTMzOTNkLTcwYTItNGY2Zi05ZDNjLTg1MzBhZjY0ZDU1Mg==',
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
        Authorization: 'Basic MzFjMzU3YTAtN2ExZC00NTkwLWFhOTktMzNiOTcyNDRkMDQ4OmMwZTMzOTNkLTcwYTItNGY2Zi05ZDNjLTg1MzBhZjY0ZDU1Mg==',
        'Content-Type': 'application/x-www-form-urlencoded',
        Host: 'customer.bmwgroup.com',
        Accept: 'application/json, text/plain, */*',
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
