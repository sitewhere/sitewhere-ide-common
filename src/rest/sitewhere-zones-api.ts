import { API } from "sitewhere-rest-api";
import { AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import { Store } from "vuex";
import { ISiteWhereUIState, createCoreApiCall, loaderWrapper } from "./sitewhere-api-wrapper";
import {
  IZoneCreateRequest,
  IZone,
  IZoneSearchCriteria,
  IZoneResponseFormat,
  IZoneSearchResults
} from "sitewhere-rest-api";

/**
 * Create a new zone.
 * @param store
 * @param request
 */
export function createZone(
  store: Store<ISiteWhereUIState>,
  request: IZoneCreateRequest
): Promise<AxiosResponse<IZone>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IZone> = API.Zones.createZone(axios, request);
  return loaderWrapper(store, api);
}

/**
 * Get a zone by unique token.
 * @param store
 * @param token
 */
export function getZone(
  store: Store<ISiteWhereUIState>,
  token: string
): Promise<AxiosResponse<IZone>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IZone> = API.Zones.getZone(axios, token);
  return loaderWrapper(store, api);
}

/**
 * Update an existing zone.
 * @param store
 * @param token
 * @param request
 */
export function updateZone(
  store: Store<ISiteWhereUIState>,
  token: string,
  request: IZoneCreateRequest
): Promise<AxiosResponse<IZone>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IZone> = API.Zones.updateZone(
    axios,
    token,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * List zones that match the given criteria.
 * @param store
 * @param criteria
 * @param format
 */
export function listZones(
  store: Store<ISiteWhereUIState>,
  criteria: IZoneSearchCriteria,
  format: IZoneResponseFormat
): Promise<AxiosResponse<IZoneSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IZoneSearchResults> = API.Zones.listZones(
    axios,
    criteria,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * Delete an existing zone.
 * @param store
 * @param token
 */
export function deleteZone(
  store: Store<ISiteWhereUIState>,
  token: string
): Promise<AxiosResponse<IZone>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IZone> = API.Zones.deleteZone(axios, token);
  return loaderWrapper(store, api);
}
