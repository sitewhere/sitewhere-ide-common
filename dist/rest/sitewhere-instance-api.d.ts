import { AxiosResponse } from "axios";
import { Store } from "vuex";
import { ISiteWhereUIState } from "./sitewhere-api-wrapper";
import { IMicroserviceSummary, ITenantEngineConfiguration, IInstanceConfiguration, IEventPipelineLogSearchCriteria, IEventPipelineLogResponseFormat, IEventPipelineLogSearchResults } from "sitewhere-rest-api";
/**
 * Get currently effective instance configuration.
 * @param store
 */
export declare function getInstanceConfiguration(store: Store<ISiteWhereUIState>): Promise<AxiosResponse<IInstanceConfiguration>>;
/**
 * Update the global instance configuration.
 * @param store
 * @param request
 */
export declare function updateInstanceConfiguration(store: Store<ISiteWhereUIState>, request: IInstanceConfiguration): Promise<AxiosResponse<IInstanceConfiguration>>;
/**
 * Get instance topology information.
 * @param store
 */
export declare function getInstanceMicroservices(store: Store<ISiteWhereUIState>): Promise<AxiosResponse<IMicroserviceSummary[]>>;
/**
 * Get tenant engine configuration information.
 * @param store
 * @param functionalArea
 * @param tenant
 */
export declare function getTenantEngineConfiguration(store: Store<ISiteWhereUIState>, functionalArea: string, tenant: string): Promise<AxiosResponse<ITenantEngineConfiguration>>;
/**
 * Update tenant engine configuration information.
 * @param store
 * @param functionalArea
 * @param tenant
 * @param configuration
 */
export declare function updateTenantEngineConfiguration(store: Store<ISiteWhereUIState>, functionalArea: string, tenant: string, configuration: any): Promise<AxiosResponse<ITenantEngineConfiguration>>;
/**
 * List event pipeline log entries for a tenant that match the given criteria.
 * @param store
 * @param tenantToken
 * @param criteria
 * @param format
 * @returns
 */
export declare function listInstancePipelineLogEntries(store: Store<ISiteWhereUIState>, tenantToken: string, criteria?: IEventPipelineLogSearchCriteria, format?: IEventPipelineLogResponseFormat): Promise<AxiosResponse<IEventPipelineLogSearchResults>>;
/**
 * Delte event pipeline log entries for a tenant.
 * @param store
 * @param tenantToken
 * @returns
 */
export declare function deleteInstancePipelineLogEntries(store: Store<ISiteWhereUIState>, tenantToken: string): Promise<AxiosResponse<void>>;
