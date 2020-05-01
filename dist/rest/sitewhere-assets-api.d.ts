import { AxiosResponse } from "axios";
import { Store } from "vuex";
import { ISiteWhereUIState } from "./sitewhere-api-wrapper";
import { IAssetCreateRequest, IAsset, IAssetSearchCriteria, IAssetResponseFormat, IAssetSearchResults } from "sitewhere-rest-api";
/**
 * Create a new asset.
 * @param store
 * @param request
 */
export declare function createAsset(store: Store<ISiteWhereUIState>, request: IAssetCreateRequest): Promise<AxiosResponse<IAsset>>;
/**
 * Get asset by token.
 * @param store
 * @param token
 * @param format
 */
export declare function getAsset(store: Store<ISiteWhereUIState>, token: string, format: IAssetResponseFormat): Promise<AxiosResponse<IAsset>>;
/**
 * Update an existing asset.
 * @param store
 * @param token
 * @param request
 */
export declare function updateAsset(store: Store<ISiteWhereUIState>, token: string, request: IAssetCreateRequest): Promise<AxiosResponse<IAsset>>;
/**
 * List assets that match criteria.
 * @param store
 * @param criteria
 * @param format
 */
export declare function listAssets(store: Store<ISiteWhereUIState>, criteria: IAssetSearchCriteria, format: IAssetResponseFormat): Promise<AxiosResponse<IAssetSearchResults>>;
/**
 * Delete an existing asset.
 * @param store
 * @param token
 */
export declare function deleteAsset(store: Store<ISiteWhereUIState>, token: string): Promise<AxiosResponse<IAsset>>;
