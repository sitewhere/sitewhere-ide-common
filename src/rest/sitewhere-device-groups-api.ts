import { API } from "sitewhere-rest-api";
import { AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import { Store } from "vuex";
import { ISiteWhereUIState, createCoreApiCall, loaderWrapper } from "./sitewhere-api-wrapper";
import {
  IDeviceGroupCreateRequest,
  IDeviceGroup,
  IDeviceGroupSearchCriteria,
  IDeviceGroupResponseFormat,
  IDeviceGroupElementCreateRequest,
  IDeviceGroupElementResponseFormat,
  IDeviceGroupElement,
  IDeviceGroupSearchResults,
  IDeviceGroupElementSearchCriteria,
  IDeviceGroupElementSearchResults
} from "sitewhere-rest-api";

/**
 * Create a new device group.
 * @param store
 * @param request
 */
export function createDeviceGroup(
  store: Store<ISiteWhereUIState>,
  request: IDeviceGroupCreateRequest
): Promise<AxiosResponse<IDeviceGroup>> {
  let axios = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceGroup
  > = API.DeviceGroups.createDeviceGroup(axios, request);
  return loaderWrapper(store, api);
}

/**
 * Get device group by token.
 * @param store
 * @param token
 * @param format
 */
export function getDeviceGroup(
  store: Store<ISiteWhereUIState>,
  token: string,
  format: IDeviceGroupResponseFormat
): Promise<AxiosResponse<IDeviceGroup>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceGroup
  > = API.DeviceGroups.getDeviceGroup(axios, token, format);
  return loaderWrapper(store, api);
}

/**
 * Update an existing device group.
 * @param store
 * @param token
 * @param request
 */
export function updateDeviceGroup(
  store: Store<ISiteWhereUIState>,
  token: string,
  request: IDeviceGroupCreateRequest
): Promise<AxiosResponse<IDeviceGroup>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceGroup
  > = API.DeviceGroups.updateDeviceGroup(axios, token, request);
  return loaderWrapper(store, api);
}

/**
 * List device groups that match criteria.
 * @param store
 * @param criteria
 * @param format
 */
export function listDeviceGroups(
  store: Store<ISiteWhereUIState>,
  criteria: IDeviceGroupSearchCriteria,
  format: IDeviceGroupResponseFormat
): Promise<AxiosResponse<IDeviceGroupSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceGroupSearchResults
  > = API.DeviceGroups.listDeviceGroups(axios, criteria, format);
  return loaderWrapper(store, api);
}

/**
 * List device group elements that match criteria.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
export function listDeviceGroupElements(
  store: Store<ISiteWhereUIState>,
  token: string,
  criteria: IDeviceGroupElementSearchCriteria,
  format: IDeviceGroupElementResponseFormat
): Promise<AxiosResponse<IDeviceGroupElementSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceGroupElementSearchResults
  > = API.DeviceGroups.listDeviceGroupElements(
    axios,
    token,
    criteria,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * Add one or more elements to a device group.
 * @param store
 * @param token
 * @param request
 */
export function createDeviceGroupElements(
  store: Store<ISiteWhereUIState>,
  token: string,
  request: IDeviceGroupElementCreateRequest[]
): Promise<AxiosResponse<IDeviceGroupElement>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceGroupElement
  > = API.DeviceGroups.createDeviceGroupElements(
    axios,
    token,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * Delete an existing device group element.
 * @param store
 * @param token
 * @param elementId
 */
export function deleteDeviceGroupElement(
  store: Store<ISiteWhereUIState>,
  token: string,
  elementId: string
): Promise<AxiosResponse<IDeviceGroupElement>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceGroupElement
  > = API.DeviceGroups.deleteDeviceGroupElement(
    axios,
    token,
    elementId
  );
  return loaderWrapper(store, api);
}

/**
 * Delete a device group.
 * @param store
 * @param token
 */
export function deleteDeviceGroup(
  store: Store<ISiteWhereUIState>,
  token: string
): Promise<AxiosResponse<IDeviceGroup>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceGroup
  > = API.DeviceGroups.deleteDeviceGroup(axios, token);
  return loaderWrapper(store, api);
}
