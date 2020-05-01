import { AxiosResponse } from "axios";
import { Store } from "vuex";
import { ISiteWhereUIState } from "./sitewhere-api-wrapper";
import { IDeviceTypeCreateRequest, IDeviceType, IDeviceTypeSearchCriteria, IDeviceTypeResponseFormat, IDeviceTypeSearchResults, IDeviceCommandCreateRequest, IDeviceCommand, IDeviceCommandResponseFormat, IDeviceStatusCreateRequest, IDeviceStatus, IDeviceStatusResponseFormat } from "sitewhere-rest-api";
/**
 * Create a new device type.
 * @param store
 * @param request
 */
export declare function createDeviceType(store: Store<ISiteWhereUIState>, request: IDeviceTypeCreateRequest): Promise<AxiosResponse<IDeviceType>>;
/**
 * Get device type by token.
 * @param store
 * @param token
 * @param format
 */
export declare function getDeviceType(store: Store<ISiteWhereUIState>, token: string, format: IDeviceTypeResponseFormat): Promise<AxiosResponse<IDeviceType>>;
/**
 * Update an existing device type.
 * @param store
 * @param token
 * @param request
 */
export declare function updateDeviceType(store: Store<ISiteWhereUIState>, token: string, request: IDeviceTypeCreateRequest): Promise<AxiosResponse<IDeviceType>>;
/**
 * List device types that match criteria.
 * @param store
 * @param criteria
 * @param format
 */
export declare function listDeviceTypes(store: Store<ISiteWhereUIState>, criteria: IDeviceTypeSearchCriteria, format: IDeviceTypeResponseFormat): Promise<AxiosResponse<IDeviceTypeSearchResults>>;
/**
 * Delete an existing device type.
 * @param store
 * @param token
 */
export declare function deleteDeviceType(store: Store<ISiteWhereUIState>, token: string): Promise<AxiosResponse<IDeviceType>>;
/**
 * Create new device command.
 * @param store
 * @param deviceTypeToken
 * @param request
 */
export declare function createDeviceCommand(store: Store<ISiteWhereUIState>, deviceTypeToken: string, request: IDeviceCommandCreateRequest): Promise<AxiosResponse<IDeviceCommand>>;
/**
 * Get device command by token.
 * @param store
 * @param deviceTypeToken
 * @param commandToken
 * @param format
 */
export declare function getDeviceCommand(store: Store<ISiteWhereUIState>, deviceTypeToken: string, commandToken: string, format: IDeviceCommandResponseFormat): Promise<AxiosResponse<IDeviceCommand>>;
/**
 * Update an existing device command.
 * @param store
 * @param deviceTypeToken
 * @param commandToken
 * @param request
 */
export declare function updateDeviceCommand(store: Store<ISiteWhereUIState>, deviceTypeToken: string, commandToken: string, request: IDeviceCommandCreateRequest): Promise<AxiosResponse<IDeviceCommand>>;
/**
 * Delete an existing device command.
 * @param store
 * @param deviceTypeToken
 * @param commandToken
 */
export declare function deleteDeviceCommand(store: Store<ISiteWhereUIState>, deviceTypeToken: string, commandToken: string): Promise<AxiosResponse<IDeviceCommand>>;
/**
 * Create a new device status.
 * @param store
 * @param deviceTypeToken
 * @param request
 */
export declare function createDeviceStatus(store: Store<ISiteWhereUIState>, deviceTypeToken: string, request: IDeviceStatusCreateRequest): Promise<AxiosResponse<IDeviceStatus>>;
/**
 * Update an existing device status.
 * @param store
 * @param deviceTypeToken
 * @param statusToken
 * @param format
 */
export declare function getDeviceStatus(store: Store<ISiteWhereUIState>, deviceTypeToken: string, statusToken: string, format: IDeviceStatusResponseFormat): Promise<AxiosResponse<IDeviceStatus>>;
/**
 * Update an existing device status.
 * @param store
 * @param deviceTypeToken
 * @param statusToken
 * @param request
 */
export declare function updateDeviceStatus(store: Store<ISiteWhereUIState>, deviceTypeToken: string, statusToken: string, request: IDeviceStatusCreateRequest): Promise<AxiosResponse<IDeviceStatus>>;
/**
 * Delete an existing device status.
 * @param store
 * @param deviceTypeToken
 * @param statusToken
 */
export declare function deleteDeviceStatus(store: Store<ISiteWhereUIState>, deviceTypeToken: string, statusToken: string): Promise<AxiosResponse<IDeviceStatus>>;
