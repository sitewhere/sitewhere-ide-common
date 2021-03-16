import { API } from "sitewhere-rest-api";
import { AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import { Store } from "vuex";
import { ISiteWhereUIState, createCoreApiCall, loaderWrapper } from "./sitewhere-api-wrapper";
import {
  IMicroserviceSummary,
  ITenantEngineConfiguration,
  IInstanceConfiguration,
  IEventPipelineLogSearchCriteria,
  IEventPipelineLogResponseFormat,
  IEventPipelineLogSearchResults
} from "sitewhere-rest-api";

/**
 * Get currently effective instance configuration.
 * @param store
 */
export function getInstanceConfiguration(
  store: Store<ISiteWhereUIState>
): Promise<AxiosResponse<IInstanceConfiguration>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IInstanceConfiguration> = API.Instance.getInstanceConfiguration(
    axios
  );
  return loaderWrapper(store, api);
}

/**
 * Update the global instance configuration.
 * @param store
 * @param request
 */
export function updateInstanceConfiguration(
  store: Store<ISiteWhereUIState>,
  request: IInstanceConfiguration
): Promise<AxiosResponse<IInstanceConfiguration>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IInstanceConfiguration> = API.Instance.updateInstanceConfiguration(
    axios,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * Get instance topology information.
 * @param store
 */
export function getInstanceMicroservices(
  store: Store<ISiteWhereUIState>
): Promise<AxiosResponse<IMicroserviceSummary[]>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IMicroserviceSummary[]> = API.Instance.getInstanceMicroservices(
    axios
  );
  return loaderWrapper(store, api);
}

/**
 * Get tenant engine configuration information.
 * @param store
 * @param functionalArea
 * @param tenant
 */
export function getTenantEngineConfiguration(
  store: Store<ISiteWhereUIState>,
  functionalArea: string,
  tenant: string
): Promise<AxiosResponse<ITenantEngineConfiguration>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<ITenantEngineConfiguration> = API.Instance.getTenantEngineConfiguration(
    axios,
    functionalArea,
    tenant
  );
  return loaderWrapper(store, api);
}

/**
 * Update tenant engine configuration information.
 * @param store
 * @param functionalArea
 * @param tenant
 * @param configuration
 */
export function updateTenantEngineConfiguration(
  store: Store<ISiteWhereUIState>,
  functionalArea: string,
  tenant: string,
  configuration: any
): Promise<AxiosResponse<ITenantEngineConfiguration>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<ITenantEngineConfiguration> = API.Instance.updateTenantEngineConfiguration(
    axios,
    functionalArea,
    tenant,
    configuration
  );
  return loaderWrapper(store, api);
}

/**
 * List event pipeline log entries for a tenant that match the given criteria.
 * @param store 
 * @param tenantToken 
 * @param criteria 
 * @param format 
 * @returns 
 */
export function listInstancePipelineLogEntries(
  store: Store<ISiteWhereUIState>,
  tenantToken: string,
  criteria?: IEventPipelineLogSearchCriteria,
  format?: IEventPipelineLogResponseFormat
): Promise<AxiosResponse<IEventPipelineLogSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IEventPipelineLogSearchResults> = API.Instance.listInstancePipelineLogEntries(
    axios,
    tenantToken,
    criteria,
    format);
  return loaderWrapper(store, api);
}

/**
 * Delte event pipeline log entries for a tenant.
 * @param store 
 * @param tenantToken 
 * @returns 
 */
export function deleteInstancePipelineLogEntries(
  store: Store<ISiteWhereUIState>,
  tenantToken: string,
): Promise<AxiosResponse<void>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<void> = API.Instance.deleteInstancePipelineLogEntries(
    axios,
    tenantToken);
  return loaderWrapper(store, api);
}
