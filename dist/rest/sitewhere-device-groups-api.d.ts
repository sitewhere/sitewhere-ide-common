import { AxiosResponse } from "axios";
import { Store } from "vuex";
import { ISiteWhereUIState } from "./sitewhere-api-wrapper";
import { IDeviceGroupCreateRequest, IDeviceGroup, IDeviceGroupSearchCriteria, IDeviceGroupResponseFormat, IDeviceGroupElementCreateRequest, IDeviceGroupElementResponseFormat, IDeviceGroupElement, IDeviceGroupSearchResults, IDeviceGroupElementSearchCriteria, IDeviceGroupElementSearchResults } from "sitewhere-rest-api";
/**
 * Create a new device group.
 * @param store
 * @param request
 */
export declare function createDeviceGroup(store: Store<ISiteWhereUIState>, request: IDeviceGroupCreateRequest): Promise<AxiosResponse<IDeviceGroup>>;
/**
 * Get device group by token.
 * @param store
 * @param token
 * @param format
 */
export declare function getDeviceGroup(store: Store<ISiteWhereUIState>, token: string, format: IDeviceGroupResponseFormat): Promise<AxiosResponse<IDeviceGroup>>;
/**
 * Update an existing device group.
 * @param store
 * @param token
 * @param request
 */
export declare function updateDeviceGroup(store: Store<ISiteWhereUIState>, token: string, request: IDeviceGroupCreateRequest): Promise<AxiosResponse<IDeviceGroup>>;
/**
 * List device groups that match criteria.
 * @param store
 * @param criteria
 * @param format
 */
export declare function listDeviceGroups(store: Store<ISiteWhereUIState>, criteria: IDeviceGroupSearchCriteria, format: IDeviceGroupResponseFormat): Promise<AxiosResponse<IDeviceGroupSearchResults>>;
/**
 * List device group elements that match criteria.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
export declare function listDeviceGroupElements(store: Store<ISiteWhereUIState>, token: string, criteria: IDeviceGroupElementSearchCriteria, format: IDeviceGroupElementResponseFormat): Promise<AxiosResponse<IDeviceGroupElementSearchResults>>;
/**
 * Add one or more elements to a device group.
 * @param store
 * @param token
 * @param request
 */
export declare function createDeviceGroupElements(store: Store<ISiteWhereUIState>, token: string, request: IDeviceGroupElementCreateRequest[]): Promise<AxiosResponse<IDeviceGroupElement>>;
/**
 * Delete an existing device group element.
 * @param store
 * @param token
 * @param elementId
 */
export declare function deleteDeviceGroupElement(store: Store<ISiteWhereUIState>, token: string, elementId: string): Promise<AxiosResponse<IDeviceGroupElement>>;
/**
 * Delete a device group.
 * @param store
 * @param token
 */
export declare function deleteDeviceGroup(store: Store<ISiteWhereUIState>, token: string): Promise<AxiosResponse<IDeviceGroup>>;
