export const Regions = {
  NORTH_AMERICA: 'NORTH_AMERICA',
  REST_OF_WORLD: 'REST_OF_WORLD',
  CHINA: 'CHINA',
} as const;

export const RequestParams = {
  [Regions.NORTH_AMERICA]: {
    base: 'https://b2vapi.bmwgroup.us/webapi/v1',
    auth: 'https://b2vapi.bmwgroup.us/gcdm/oauth/authenticate',
    token: 'https://b2vapi.bmwgroup.us/gcdm/oauth/token',
    authorization: 'Basic NTQzOTRhNGItYjZjMS00NWZlLWI3YjItOGZkM2FhOTI1M2FhOmQ5MmYzMWMwLWY1NzktNDRmNS1hNzdkLTk2NmY4ZjAwZTM1MQ==',
  },
  [Regions.REST_OF_WORLD]: {
    base: 'https://b2vapi.bmwgroup.com/webapi/v1',
    auth: 'https://customer.bmwgroup.com/gcdm/oauth/authenticate',
    token: 'https://customer.bmwgroup.com/gcdm/oauth/token',
    authorization: 'Basic MzFjMzU3YTAtN2ExZC00NTkwLWFhOTktMzNiOTcyNDRkMDQ4OmMwZTMzOTNkLTcwYTItNGY2Zi05ZDNjLTg1MzBhZjY0ZDU1Mg==',
  },
  [Regions.CHINA]: {
    base: 'https://b2vapi.bmwgroup.cn:8592/webapi/v1',
    auth: 'https://customer.bmwgroup.cn/gcdm/oauth/authenticate',
    token: 'https://customer.bmwgroup.cn/gcdm/oauth/token',
    authorization: 'Basic blF2NkNxdHhKdVhXUDc0eGYzQ0p3VUVQOjF6REh4NnVuNGNEanliTEVOTjNreWZ1bVgya0VZaWdXUGNRcGR2RFJwSUJrN3JPSg==',
  },
} as const;

export const SERVICE_TYPE = {
  LIGHT_FLASH: 'LIGHT_FLASH',
  VEHICLE_FINDER: 'VEHICLE_FINDER',
  DOOR_LOCK: 'DOOR_LOCK',
  DOOR_UNLOCK: 'DOOR_UNLOCK',
  HORN_BLOW: 'HORN_BLOW',
  CLIMATE_NOW: 'CLIMATE_NOW',
} as const;
