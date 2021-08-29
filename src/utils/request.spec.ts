import { getRequestHeaders } from 'src/utils';

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