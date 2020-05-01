import { AxiosResponse } from "axios";
import { Store } from "vuex";
import { ISiteWhereUIState } from "./sitewhere-api-wrapper";
import { IMicroserviceSummary, ITenantEngineConfiguration, IInstanceConfiguration } from "sitewhere-rest-api";
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
