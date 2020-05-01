import { AxiosResponse } from "axios";
import { Store } from "vuex";
import { ISiteWhereUIState } from "./sitewhere-api-wrapper";
import { IAreaTypeCreateRequest, IAreaType, IAreaTypeSearchCriteria, IAreaTypeResponseFormat, IAreaTypeSearchResults } from "sitewhere-rest-api";
/**
 * Create a new area type.
 * @param store
 * @param request
 */
export declare function createAreaType(store: Store<ISiteWhereUIState>, request: IAreaTypeCreateRequest): Promise<AxiosResponse<IAreaType>>;
/**
 * Get an area type by token.
 * @param store
 * @param token
 * @param format
 */
export declare function getAreaType(store: Store<ISiteWhereUIState>, token: string, format: IAreaTypeResponseFormat): Promise<AxiosResponse<IAreaType>>;
/**
 * Update an existing area type.
 * @param store
 * @param token
 * @param request
 */
export declare function updateAreaType(store: Store<ISiteWhereUIState>, token: string, request: IAreaTypeCreateRequest): Promise<AxiosResponse<IAreaType>>;
/**
 * List area types that match the given criteria.
 * @param store
 * @param criteria
 * @param format
 */
export declare function listAreaTypes(store: Store<ISiteWhereUIState>, criteria: IAreaTypeSearchCriteria, format: IAreaTypeResponseFormat): Promise<AxiosResponse<IAreaTypeSearchResults>>;
/**
 * Delete an existing area type.
 * @param store
 * @param token
 */
export declare function deleteAreaType(store: Store<ISiteWhereUIState>, token: string): Promise<AxiosResponse<IAreaType>>;
