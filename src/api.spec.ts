import BMWConnectedDrive from 'src/api';
import { Regions } from './constants';
import * as Authenticator from './authenticator';
import axios from 'axios';

jest.mock('./authenticator');
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('BMWConnectedDrive', () => {
  let bmw: BMWConnectedDrive;
  const getAccessTokenStub = jest.fn();
  const mockedAuthenticator = Authenticator.default as jest.Mock;
  beforeEach(() => {
    const opts: AuthOptions = {
      username: 'test',
      password: 'test',
      region: Regions.NORTH_AMERICA,
    };
    bmw = new BMWConnectedDrive(opts);
    getAccessTokenStub.mockReturnValue({
      token: 'test',
      expiresIn: 'test-expires-in',
      retrievedAt: 'test-retrieved-at',
    });
    mockedAuthenticator.mockImplementation(() => ({
      getAccessToken: getAccessTokenStub,
      region: opts.region,
    }));
  });

  describe('constructor', () => {
    it('should get a new authenticator', () => {
      expect(bmw.authenticator).not.toBeUndefined();
    });
  });

  describe('getAccessToken', () => {
    it('should get authentication information', async () => {
      await bmw.authenticate();
      expect(getAccessTokenStub).toHaveBeenCalled();
      expect(bmw.authentication).toEqual({
        token: 'test',
        expiresIn: 'test-expires-in',
        retrievedAt: 'test-retrieved-at',
      });
    });
  });

  describe('getVehicles', () => {
    beforeEach(() => {
      const data = ['some vehicle'];
      mockedAxios.get.mockResolvedValue({ data });
    });

    describe('when authentication is missing', () => {
      it('should throw error', async () => {
        await expect(bmw.getVehicles()).rejects.toThrow('Missing access token');
      });
    });

    describe('when authentication is valid', () => {
      it('should return data', async () => {
        await bmw.authenticate();
        const result = await bmw.getVehicles();
        expect(result).toEqual(['some vehicle']);
      });
    });
  });
});
