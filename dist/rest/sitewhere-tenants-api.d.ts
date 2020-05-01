import { AxiosResponse } from "axios";
import { Store } from "vuex";
import { ISiteWhereUIState } from "./sitewhere-api-wrapper";
import { ITenantCreateRequest, ITenant, ITenantSearchCriteria, ITenantResponseFormat, ITenantConfigurationTemplate, ITenantDatasetTemplate, ITenantSearchResults } from "sitewhere-rest-api";
/**
 * Create a new system tenant.
 * @param store
 * @param request
 */
export declare function createTenant(store: Store<ISiteWhereUIState>, request: ITenantCreateRequest): Promise<AxiosResponse<ITenant>>;
/**
 * Get system tenant by token.
 * @param store
 * @param token
 * @param format
 */
export declare function getTenant(store: Store<ISiteWhereUIState>, token: string, format: ITenantResponseFormat): Promise<AxiosResponse<ITenant>>;
/**
 * Update an existing system tenant.
 * @param store
 * @param token
 * @param request
 */
export declare function updateTenant(store: Store<ISiteWhereUIState>, token: string, request: ITenantCreateRequest): Promise<AxiosResponse<ITenant>>;
/**
 * List system tenants that match the given criteria.
 * @param store
 * @param criteria
 * @param format
 */
export declare function listTenants(store: Store<ISiteWhereUIState>, criteria: ITenantSearchCriteria, format: ITenantResponseFormat): Promise<AxiosResponse<ITenantSearchResults>>;
/**
 * Delete an existing system tenant.
 * @param store
 * @param token
 */
export declare function deleteTenant(store: Store<ISiteWhereUIState>, token: string): Promise<AxiosResponse<ITenant>>;
/**
 * List available tenant configuration templates.
 * @param store
 */
export declare function listTenantConfigurationTemplates(store: Store<ISiteWhereUIState>): Promise<AxiosResponse<ITenantConfigurationTemplate[]>>;
/**
 * List available dataset templates.
 * @param store
 */
export declare function listTenantDatasetTemplates(store: Store<ISiteWhereUIState>): Promise<AxiosResponse<ITenantDatasetTemplate[]>>;
