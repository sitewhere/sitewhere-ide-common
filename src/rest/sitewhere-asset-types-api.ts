import { API } from "sitewhere-rest-api";
import { AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import { Store } from "vuex";
import { ISiteWhereUIState, createCoreApiCall, loaderWrapper } from "./sitewhere-api-wrapper";
import {
  IAssetTypeCreateRequest,
  IAssetType,
  IAssetTypeSearchCriteria,
  IAssetTypeResponseFormat,
  IAssetTypeSearchResults
} from "sitewhere-rest-api";

/**
 * Create a new asset type.
 * @param store
 * @param request
 */
export function createAssetType(
  store: Store<ISiteWhereUIState>,
  request: IAssetTypeCreateRequest
): Promise<AxiosResponse<IAssetType>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IAssetType> = API.AssetTypes.createAssetType(
    axios,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * Get asset type by token.
 * @param store
 * @param token
 * @param format
 */
export function getAssetType(
  store: Store<ISiteWhereUIState>,
  token: string,
  format: IAssetTypeResponseFormat
): Promise<AxiosResponse<IAssetType>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IAssetType> = API.AssetTypes.getAssetType(
    axios,
    token,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * Update an existing asset type.
 * @param store
 * @param token
 * @param request
 */
export function updateAssetType(
  store: Store<ISiteWhereUIState>,
  token: string,
  request: IAssetTypeCreateRequest
): Promise<AxiosResponse<IAssetType>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IAssetType> = API.AssetTypes.updateAssetType(
    axios,
    token,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * List asset types that match criteria.
 * @param store
 * @param criteria
 * @param format
 */
export function listAssetTypes(
  store: Store<ISiteWhereUIState>,
  criteria: IAssetTypeSearchCriteria,
  format: IAssetTypeResponseFormat
): Promise<AxiosResponse<IAssetTypeSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IAssetTypeSearchResults
  > = API.AssetTypes.listAssetTypes(axios, criteria, format);
  return loaderWrapper(store, api);
}

/**
 * Delete an existing asset type.
 * @param store
 * @param token
 */
export function deleteAssetType(
  store: Store<ISiteWhereUIState>,
  token: string
): Promise<AxiosResponse<IAssetType>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IAssetType> = API.AssetTypes.deleteAssetType(
    axios,
    token
  );
  return loaderWrapper(store, api);
}
