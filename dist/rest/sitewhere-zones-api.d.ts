import { AxiosResponse } from "axios";
import { Store } from "vuex";
import { ISiteWhereUIState } from "./sitewhere-api-wrapper";
import { IZoneCreateRequest, IZone, IZoneSearchCriteria, IZoneResponseFormat, IZoneSearchResults } from "sitewhere-rest-api";
/**
 * Create a new zone.
 * @param store
 * @param request
 */
export declare function createZone(store: Store<ISiteWhereUIState>, request: IZoneCreateRequest): Promise<AxiosResponse<IZone>>;
/**
 * Get a zone by unique token.
 * @param store
 * @param token
 */
export declare function getZone(store: Store<ISiteWhereUIState>, token: string): Promise<AxiosResponse<IZone>>;
/**
 * Update an existing zone.
 * @param store
 * @param token
 * @param request
 */
export declare function updateZone(store: Store<ISiteWhereUIState>, token: string, request: IZoneCreateRequest): Promise<AxiosResponse<IZone>>;
/**
 * List zones that match the given criteria.
 * @param store
 * @param criteria
 * @param format
 */
export declare function listZones(store: Store<ISiteWhereUIState>, criteria: IZoneSearchCriteria, format: IZoneResponseFormat): Promise<AxiosResponse<IZoneSearchResults>>;
/**
 * Delete an existing zone.
 * @param store
 * @param token
 */
export declare function deleteZone(store: Store<ISiteWhereUIState>, token: string): Promise<AxiosResponse<IZone>>;
