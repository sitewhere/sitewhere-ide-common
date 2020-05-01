import { API } from "sitewhere-rest-api";
import { AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import { Store } from "vuex";
import { ISiteWhereUIState, createCoreApiCall, loaderWrapper } from "./sitewhere-api-wrapper";
import {
  IDeviceTypeCreateRequest,
  IDeviceType,
  IDeviceTypeSearchCriteria,
  IDeviceTypeResponseFormat,
  IDeviceTypeSearchResults,
  IDeviceCommandCreateRequest,
  IDeviceCommand,
  IDeviceCommandResponseFormat,
  IDeviceStatusCreateRequest,
  IDeviceStatus,
  IDeviceStatusResponseFormat
} from "sitewhere-rest-api";

/**
 * Create a new device type.
 * @param store
 * @param request
 */
export function createDeviceType(
  store: Store<ISiteWhereUIState>,
  request: IDeviceTypeCreateRequest
): Promise<AxiosResponse<IDeviceType>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceType
  > = API.DeviceTypes.createDeviceType(axios, request);
  return loaderWrapper(store, api);
}

/**
 * Get device type by token.
 * @param store
 * @param token
 * @param format
 */
export function getDeviceType(
  store: Store<ISiteWhereUIState>,
  token: string,
  format: IDeviceTypeResponseFormat
): Promise<AxiosResponse<IDeviceType>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IDeviceType> = API.DeviceTypes.getDeviceType(
    axios,
    token,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * Update an existing device type.
 * @param store
 * @param token
 * @param request
 */
export function updateDeviceType(
  store: Store<ISiteWhereUIState>,
  token: string,
  request: IDeviceTypeCreateRequest
): Promise<AxiosResponse<IDeviceType>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceType
  > = API.DeviceTypes.updateDeviceType(axios, token, request);
  return loaderWrapper(store, api);
}

/**
 * List device types that match criteria.
 * @param store
 * @param criteria
 * @param format
 */
export function listDeviceTypes(
  store: Store<ISiteWhereUIState>,
  criteria: IDeviceTypeSearchCriteria,
  format: IDeviceTypeResponseFormat
): Promise<AxiosResponse<IDeviceTypeSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceTypeSearchResults
  > = API.DeviceTypes.listDeviceTypes(axios, criteria, format);
  return loaderWrapper(store, api);
}

/**
 * Delete an existing device type.
 * @param store
 * @param token
 */
export function deleteDeviceType(
  store: Store<ISiteWhereUIState>,
  token: string
): Promise<AxiosResponse<IDeviceType>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceType
  > = API.DeviceTypes.deleteDeviceType(axios, token);
  return loaderWrapper(store, api);
}

/**
 * Create new device command.
 * @param store
 * @param deviceTypeToken
 * @param request
 */
export function createDeviceCommand(
  store: Store<ISiteWhereUIState>,
  deviceTypeToken: string,
  request: IDeviceCommandCreateRequest
): Promise<AxiosResponse<IDeviceCommand>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceCommand
  > = API.DeviceTypes.createDeviceCommand(
    axios,
    deviceTypeToken,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * Get device command by token.
 * @param store
 * @param deviceTypeToken
 * @param commandToken
 * @param format
 */
export function getDeviceCommand(
  store: Store<ISiteWhereUIState>,
  deviceTypeToken: string,
  commandToken: string,
  format: IDeviceCommandResponseFormat
): Promise<AxiosResponse<IDeviceCommand>> {
  let axios = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceCommand
  > = API.DeviceTypes.getDeviceCommand(
    axios,
    deviceTypeToken,
    commandToken,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * Update an existing device command.
 * @param store
 * @param deviceTypeToken
 * @param commandToken
 * @param request
 */
export function updateDeviceCommand(
  store: Store<ISiteWhereUIState>,
  deviceTypeToken: string,
  commandToken: string,
  request: IDeviceCommandCreateRequest
): Promise<AxiosResponse<IDeviceCommand>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceCommand
  > = API.DeviceTypes.updateDeviceCommand(
    axios,
    deviceTypeToken,
    commandToken,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * Delete an existing device command.
 * @param store
 * @param deviceTypeToken
 * @param commandToken
 */
export function deleteDeviceCommand(
  store: Store<ISiteWhereUIState>,
  deviceTypeToken: string,
  commandToken: string
): Promise<AxiosResponse<IDeviceCommand>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceCommand
  > = API.DeviceTypes.deleteDeviceCommand(
    axios,
    deviceTypeToken,
    commandToken
  );
  return loaderWrapper(store, api);
}

/**
 * Create a new device status.
 * @param store
 * @param deviceTypeToken
 * @param request
 */
export function createDeviceStatus(
  store: Store<ISiteWhereUIState>,
  deviceTypeToken: string,
  request: IDeviceStatusCreateRequest
): Promise<AxiosResponse<IDeviceStatus>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceStatus
  > = API.DeviceTypes.createDeviceStatus(
    axios,
    deviceTypeToken,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * Update an existing device status.
 * @param store
 * @param deviceTypeToken
 * @param statusToken
 * @param format
 */
export function getDeviceStatus(
  store: Store<ISiteWhereUIState>,
  deviceTypeToken: string,
  statusToken: string,
  format: IDeviceStatusResponseFormat
): Promise<AxiosResponse<IDeviceStatus>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceStatus
  > = API.DeviceTypes.getDeviceStatus(
    axios,
    deviceTypeToken,
    statusToken,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * Update an existing device status.
 * @param store
 * @param deviceTypeToken
 * @param statusToken
 * @param request
 */
export function updateDeviceStatus(
  store: Store<ISiteWhereUIState>,
  deviceTypeToken: string,
  statusToken: string,
  request: IDeviceStatusCreateRequest
): Promise<AxiosResponse<IDeviceStatus>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceStatus
  > = API.DeviceTypes.updateDeviceStatus(
    axios,
    deviceTypeToken,
    statusToken,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * Delete an existing device status.
 * @param store
 * @param deviceTypeToken
 * @param statusToken
 */
export function deleteDeviceStatus(
  store: Store<ISiteWhereUIState>,
  deviceTypeToken: string,
  statusToken: string
): Promise<AxiosResponse<IDeviceStatus>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceStatus
  > = API.DeviceTypes.deleteDeviceStatus(
    axios,
    deviceTypeToken,
    statusToken
  );
  return loaderWrapper(store, api);
}
