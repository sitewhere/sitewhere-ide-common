import { API } from "sitewhere-rest-api";
import { AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import { Store } from "vuex";
import { ISiteWhereUIState, createCoreApiCall, loaderWrapper } from "./sitewhere-api-wrapper";
import {
  IAreaTypeCreateRequest,
  IAreaType,
  IAreaTypeSearchCriteria,
  IAreaTypeResponseFormat,
  IAreaTypeSearchResults
} from "sitewhere-rest-api";

/**
 * Create a new area type.
 * @param store
 * @param request
 */
export function createAreaType(
  store: Store<ISiteWhereUIState>,
  request: IAreaTypeCreateRequest
): Promise<AxiosResponse<IAreaType>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IAreaType> = API.AreaTypes.createAreaType(
    axios,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * Get an area type by token.
 * @param store
 * @param token
 * @param format
 */
export function getAreaType(
  store: Store<ISiteWhereUIState>,
  token: string,
  format: IAreaTypeResponseFormat
): Promise<AxiosResponse<IAreaType>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IAreaType> = API.AreaTypes.getAreaType(
    axios,
    token,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * Update an existing area type.
 * @param store
 * @param token
 * @param request
 */
export function updateAreaType(
  store: Store<ISiteWhereUIState>,
  token: string,
  request: IAreaTypeCreateRequest
): Promise<AxiosResponse<IAreaType>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IAreaType> = API.AreaTypes.updateAreaType(
    axios,
    token,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * List area types that match the given criteria.
 * @param store
 * @param criteria
 * @param format
 */
export function listAreaTypes(
  store: Store<ISiteWhereUIState>,
  criteria: IAreaTypeSearchCriteria,
  format: IAreaTypeResponseFormat
): Promise<AxiosResponse<IAreaTypeSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IAreaTypeSearchResults
  > = API.AreaTypes.listAreaTypes(axios, criteria, format);
  return loaderWrapper(store, api);
}

/**
 * Delete an existing area type.
 * @param store
 * @param token
 */
export function deleteAreaType(
  store: Store<ISiteWhereUIState>,
  token: string
): Promise<AxiosResponse<IAreaType>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IAreaType> = API.AreaTypes.deleteAreaType(
    axios,
    token
  );
  return loaderWrapper(store, api);
}
