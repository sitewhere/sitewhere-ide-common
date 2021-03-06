import { API } from "sitewhere-rest-api";
import { AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import { Store } from "vuex";
import { ISiteWhereUIState, createCoreApiCall, loaderWrapper } from "./sitewhere-api-wrapper";
import {
  IDeviceCreateRequest,
  IDevice,
  IDeviceSummary,
  IDeviceSearchCriteria,
  IDeviceResponseFormat,
  IDeviceSearchResults,
  IDeviceSummarySearchResults,
  ISearchCriteria,
  IDeviceAssignmentResponseFormat,
  IDeviceAssignmentSearchResults
} from "sitewhere-rest-api";

/**
 * Create a device.
 * @param store
 * @param request
 */
export function createDevice(
  store: Store<ISiteWhereUIState>,
  request: IDeviceCreateRequest
): Promise<AxiosResponse<IDevice>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IDevice> = API.Devices.createDevice(
    axios,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * Get a device by token.
 * @param store
 * @param token
 */
export function getDevice(
  store: Store<ISiteWhereUIState>,
  token: string,
  format: IDeviceResponseFormat
): Promise<AxiosResponse<IDevice>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IDevice> = API.Devices.getDevice(
    axios,
    token,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * Update an existing device.
 * @param store
 * @param token
 * @param request
 */
export function updateDevice(
  store: Store<ISiteWhereUIState>,
  token: string,
  request: IDeviceCreateRequest
): Promise<AxiosResponse<IDevice>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IDevice> = API.Devices.updateDevice(
    axios,
    token,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * List devices that match criteria.
 * @param store
 * @param criteria
 * @param format
 */
export function listDevices(
  store: Store<ISiteWhereUIState>,
  criteria: IDeviceSearchCriteria,
  format: IDeviceResponseFormat
): Promise<AxiosResponse<IDeviceSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceSearchResults
  > = API.Devices.listDevices(axios, criteria, format);
  return loaderWrapper(store, api);
}

/**
 * List summaries for devices that match criteria.
 * @param store
 * @param criteria
 * @param format
 */
export function listDeviceSummaries(
  store: Store<ISiteWhereUIState>,
  criteria: IDeviceSearchCriteria
): Promise<AxiosResponse<IDeviceSummarySearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceSummarySearchResults
  > = API.Devices.listDeviceSummaries(axios, criteria);
  return loaderWrapper(store, api);
}

/**
 * List assignment history for a device.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
export function listDeviceAssignmentHistory(
  store: Store<ISiteWhereUIState>,
  token: string,
  criteria: ISearchCriteria,
  format: IDeviceAssignmentResponseFormat
): Promise<AxiosResponse<IDeviceAssignmentSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceAssignmentSearchResults
  > = API.Devices.listDeviceAssignmentHistory(
    axios,
    token,
    criteria,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * Delete an existing device.
 * @param store
 * @param token
 */
export function deleteDevice(
  store: Store<ISiteWhereUIState>,
  token: string
): Promise<AxiosResponse<IDevice>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IDevice> = API.Devices.deleteDevice(
    axios,
    token
  );
  return loaderWrapper(store, api);
}
