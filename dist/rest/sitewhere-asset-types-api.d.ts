import { AxiosResponse } from "axios";
import { Store } from "vuex";
import { ISiteWhereUIState } from "./sitewhere-api-wrapper";
import { IAssetTypeCreateRequest, IAssetType, IAssetTypeSearchCriteria, IAssetTypeResponseFormat, IAssetTypeSearchResults } from "sitewhere-rest-api";
/**
 * Create a new asset type.
 * @param store
 * @param request
 */
export declare function createAssetType(store: Store<ISiteWhereUIState>, request: IAssetTypeCreateRequest): Promise<AxiosResponse<IAssetType>>;
/**
 * Get asset type by token.
 * @param store
 * @param token
 * @param format
 */
export declare function getAssetType(store: Store<ISiteWhereUIState>, token: string, format: IAssetTypeResponseFormat): Promise<AxiosResponse<IAssetType>>;
/**
 * Update an existing asset type.
 * @param store
 * @param token
 * @param request
 */
export declare function updateAssetType(store: Store<ISiteWhereUIState>, token: string, request: IAssetTypeCreateRequest): Promise<AxiosResponse<IAssetType>>;
/**
 * List asset types that match criteria.
 * @param store
 * @param criteria
 * @param format
 */
export declare function listAssetTypes(store: Store<ISiteWhereUIState>, criteria: IAssetTypeSearchCriteria, format: IAssetTypeResponseFormat): Promise<AxiosResponse<IAssetTypeSearchResults>>;
/**
 * Delete an existing asset type.
 * @param store
 * @param token
 */
export declare function deleteAssetType(store: Store<ISiteWhereUIState>, token: string): Promise<AxiosResponse<IAssetType>>;
