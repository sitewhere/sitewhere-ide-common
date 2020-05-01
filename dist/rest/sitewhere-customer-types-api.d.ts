import { AxiosResponse } from "axios";
import { Store } from "vuex";
import { ISiteWhereUIState } from "./sitewhere-api-wrapper";
import { ICustomerTypeCreateRequest, ICustomerType, ICustomerTypeSearchCriteria, ICustomerTypeResponseFormat, ICustomerTypeSearchResults } from "sitewhere-rest-api";
/**
 * Create a new customer type.
 * @param store
 * @param request
 */
export declare function createCustomerType(store: Store<ISiteWhereUIState>, request: ICustomerTypeCreateRequest): Promise<AxiosResponse<ICustomerType>>;
/**
 * Get customer type by token.
 * @param store
 * @param token
 */
export declare function getCustomerType(store: Store<ISiteWhereUIState>, token: string, format: ICustomerTypeResponseFormat): Promise<AxiosResponse<ICustomerType>>;
/**
 * Update an existing customer type.
 * @param store
 * @param token
 * @param request
 */
export declare function updateCustomerType(store: Store<ISiteWhereUIState>, token: string, request: ICustomerTypeCreateRequest): Promise<AxiosResponse<ICustomerType>>;
/**
 * List customer types that match the given criteria.
 * @param store
 * @param criteria
 * @param format
 */
export declare function listCustomerTypes(store: Store<ISiteWhereUIState>, criteria: ICustomerTypeSearchCriteria, format: ICustomerTypeResponseFormat): Promise<AxiosResponse<ICustomerTypeSearchResults>>;
/**
 * Delete an existing customer type.
 * @param store
 * @param token
 */
export declare function deleteCustomerType(store: Store<ISiteWhereUIState>, token: string): Promise<AxiosResponse<ICustomerType>>;
