import { Logger } from 'tslog';
import BMWConnectedDrive from 'src/api';
import { Regions } from './constants';
import Authenticator from './authenticator';
import { getRequest } from './utils';

jest.mock('./utils/request', () => ({
  ...jest.requireActual('./utils/request'),
  getRequest: jest.fn(),
}));

const getAccessTokenStub = jest.fn();
jest.mock('./authenticator', () => {
  return jest.fn().mockImplementation(() => {
    return { getAccessToken: getAccessTokenStub, region: Regions.NORTH_AMERICA };
  });
});

describe('BMWConnectedDrive', () => {
  let bmw: BMWConnectedDrive;

  const getRequestMock = getRequest as jest.Mock;

  beforeAll(() => {
    getAccessTokenStub.mockReturnValue({
      token: 'test',
      expiresIn: 'test-expires-in',
      retrievedAt: 'test-retrieved-at',
    });
  });

  beforeEach(() => {
    const authenticator = new Authenticator({ region: Regions.NORTH_AMERICA, username: 'test', password: 'test ' });
    const log = new Logger({ name: 'connected-drive-log', type: 'pretty' });
    const opts = {
      authenticator,
      log,
      debug: false,
    };
    bmw = new BMWConnectedDrive(opts);
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
      getRequestMock.mockResolvedValue(data);
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
        expect(getRequestMock).toHaveBeenCalledWith({
          url: 'https://b2vapi.bmwgroup.us/webapi/v1/user/vehicles',
          token: 'test',
        });
      });
    });
  });
});
