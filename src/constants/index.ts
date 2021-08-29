export const Regions = {
  NORTH_AMERICA: 'NORTH_AMERICA',
  REST_OF_WORLD: 'REST_OF_WORLD',
  CHINA: 'CHINA',
} as const;

export const RequestParams = {
  [Regions.NORTH_AMERICA]: {
    base: 'https://b2vapi.bmwgroup.us/webapi/v1',
    auth: 'https://b2vapi.bmwgroup.us/gcdm',
    authorization: 'Basic ZDc2NmI1MzctYTY1NC00Y2JkLWEzZGMtMGNhNTY3MmQ3ZjhkOjE1ZjY5N2Y2LWE1ZDUtNGNhZC05OWQ5LTNhMTViYzdmMzk3Mw==',
  },
  [Regions.REST_OF_WORLD]: {
    base: 'https://b2vapi.bmwgroup.com/webapi/v1',
    auth: 'https://customer.bmwgroup.com/gcdm',
    authorization: 'Basic ZDc2NmI1MzctYTY1NC00Y2JkLWEzZGMtMGNhNTY3MmQ3ZjhkOjE1ZjY5N2Y2LWE1ZDUtNGNhZC05OWQ5LTNhMTViYzdmMzk3Mw==',
  },
  [Regions.CHINA]: {
    base: 'https://b2vapi.bmwgroup.cn:8592/webapi/v1',
    auth: 'https://customer.bmwgroup.cn/gcdm',
    authorization: 'Basic blF2NkNxdHhKdVhXUDc0eGYzQ0p3VUVQOjF6REh4NnVuNGNEanliTEVOTjNreWZ1bVgya0VZaWdXUGNRcGR2RFJwSUJrN3JPSg==',
  },
};

export const SERVICE_TYPE = {
  LIGHT_FLASH: 'LIGHT_FLASH',
  VEHICLE_FINDER: 'VEHICLE_FINDER',
  DOOR_LOCK: 'DOOR_LOCK',
  DOOR_UNLOCK: 'DOOR_UNLOCK',
  HORN_BLOW: 'HORN_BLOW',
  CLIMATE_NOW: 'CLIMATE_NOW',
};
