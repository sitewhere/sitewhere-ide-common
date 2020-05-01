import { AxiosResponse } from "axios";
import { Store } from "vuex";
import { ISiteWhereUIState } from "./sitewhere-api-wrapper";
import { IDeviceCreateRequest, IDevice, IDeviceSearchCriteria, IDeviceResponseFormat, IDeviceSearchResults, ISearchCriteria, IDeviceAssignmentResponseFormat, IDeviceAssignmentSearchResults } from "sitewhere-rest-api";
/**
 * Create a device.
 * @param store
 * @param request
 */
export declare function createDevice(store: Store<ISiteWhereUIState>, request: IDeviceCreateRequest): Promise<AxiosResponse<IDevice>>;
/**
 * Get a device by token.
 * @param store
 * @param token
 */
export declare function getDevice(store: Store<ISiteWhereUIState>, token: string, format: IDeviceResponseFormat): Promise<AxiosResponse<IDevice>>;
/**
 * Update an existing device.
 * @param store
 * @param token
 * @param request
 */
export declare function updateDevice(store: Store<ISiteWhereUIState>, token: string, request: IDeviceCreateRequest): Promise<AxiosResponse<IDevice>>;
/**
 * List devices that match criteria.
 * @param store
 * @param criteria
 * @param format
 */
export declare function listDevices(store: Store<ISiteWhereUIState>, criteria: IDeviceSearchCriteria, format: IDeviceResponseFormat): Promise<AxiosResponse<IDeviceSearchResults>>;
/**
 * List assignment history for a device.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
export declare function listDeviceAssignmentHistory(store: Store<ISiteWhereUIState>, token: string, criteria: ISearchCriteria, format: IDeviceAssignmentResponseFormat): Promise<AxiosResponse<IDeviceAssignmentSearchResults>>;
/**
 * Delete an existing device.
 * @param store
 * @param token
 */
export declare function deleteDevice(store: Store<ISiteWhereUIState>, token: string): Promise<AxiosResponse<IDevice>>;
