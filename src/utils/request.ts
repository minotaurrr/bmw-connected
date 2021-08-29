import { RequestParams } from 'src/constants';

export const getBaseURL = (region: Region) => RequestParams[region].base;

export const getAuthURL = (region: Region) => RequestParams[region].auth;

export const getAuthorization = (region: Region) => RequestParams[region].authorization;

export const getVehicleURL = (region: Region) => `${getBaseURL(region)}/user/vehicles`;

export const getVehicleVinURL = (region: Region, vin: string) => `${getVehicleURL(region)}/${vin}`;

export const getVehicleStatusURL = (region: Region, vin: string) => `${getVehicleVinURL(region, vin)}/status`;

export const remoteServiceURL = (region: Region, vin: string) => `${getVehicleVinURL(region, vin)}/executeService`;

export const getRequestHeaders = (token: string) => ({
  accept: 'application/json',
  Authorization: `Bearer ${token}`,
  referer: 'https://www.bmw-connecteddrive.de/app/index.html',
});