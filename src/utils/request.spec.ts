import { getRequestHeaders, getRequest } from 'src/utils';
import axios from 'axios';
import { postRequest } from './request';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getRequestHeaders', () => {
  it('should return headers with provided token', () => {
    const token = 'test-token';
    const result = getRequestHeaders(token);
    expect(result).toEqual({
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
      referer: 'https://www.bmw-connecteddrive.de/app/index.html',
    });
  });
});

describe('getRequest', () => {
  const token = '1234';
  const url = 'test-url';
  beforeEach(() => {
    const data = ['vehicle'];
    mockedAxios.get.mockResolvedValue({ data });
  });

  it('should return fetched data', async () => {
    const result = await getRequest({ token, url });
    expect(result).toEqual(['vehicle']);
  });
});

describe('postRequest', () => {
  const token = '1234';
  const url = 'test-url';
  const postData = {
    data: 1,
  };
  beforeEach(() => {
    const data = ['vehicle'];
    mockedAxios.post.mockResolvedValue({ data });
  });

  it('should return fetched data', async () => {
    const result = await postRequest({ token, url, postData });
    expect(result).toEqual(['vehicle']);
  });
});
