import { API } from "sitewhere-rest-api";
import { AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import { Store } from "vuex";
import { ISiteWhereUIState, createCoreApiCall, loaderWrapper } from "./sitewhere-api-wrapper";
import {
  ITenantCreateRequest,
  ITenant,
  ITenantSearchCriteria,
  ITenantResponseFormat,
  ITenantConfigurationTemplate,
  ITenantDatasetTemplate,
  ITenantSearchResults
} from "sitewhere-rest-api";

/**
 * Create a new system tenant.
 * @param store
 * @param request
 */
export function createTenant(
  store: Store<ISiteWhereUIState>,
  request: ITenantCreateRequest
): Promise<AxiosResponse<ITenant>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<ITenant> = API.Tenants.createTenant(
    axios,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * Get system tenant by token.
 * @param store
 * @param token
 * @param format
 */
export function getTenant(
  store: Store<ISiteWhereUIState>,
  token: string,
  format: ITenantResponseFormat
): Promise<AxiosResponse<ITenant>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<ITenant> = API.Tenants.getTenant(
    axios,
    token,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * Update an existing system tenant.
 * @param store
 * @param token
 * @param request
 */
export function updateTenant(
  store: Store<ISiteWhereUIState>,
  token: string,
  request: ITenantCreateRequest
): Promise<AxiosResponse<ITenant>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<ITenant> = API.Tenants.updateTenant(
    axios,
    token,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * List system tenants that match the given criteria.
 * @param store
 * @param criteria
 * @param format
 */
export function listTenants(
  store: Store<ISiteWhereUIState>,
  criteria: ITenantSearchCriteria,
  format: ITenantResponseFormat
): Promise<AxiosResponse<ITenantSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<ITenantSearchResults> = API.Tenants.listTenants(
    axios,
    criteria,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * Delete an existing system tenant.
 * @param store
 * @param token
 */
export function deleteTenant(
  store: Store<ISiteWhereUIState>,
  token: string
): Promise<AxiosResponse<ITenant>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<ITenant> = API.Tenants.deleteTenant(
    axios,
    token
  );
  return loaderWrapper(store, api);
}

/**
 * List available tenant configuration templates.
 * @param store
 */
export function listTenantConfigurationTemplates(
  store: Store<ISiteWhereUIState>
): Promise<AxiosResponse<ITenantConfigurationTemplate[]>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<ITenantConfigurationTemplate[]> = API.Tenants.listTenantConfigurationTemplates(
    axios
  );
  return loaderWrapper(store, api);
}

/**
 * List available dataset templates.
 * @param store
 */
export function listTenantDatasetTemplates(
  store: Store<ISiteWhereUIState>
): Promise<AxiosResponse<ITenantDatasetTemplate[]>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<ITenantDatasetTemplate[]> = API.Tenants.listTenantDatasetTemplates(
    axios
  );
  return loaderWrapper(store, api);
}
