import { IRoleResponseFormat, IRoleSearchCriteria, IRoleSearchResults } from "sitewhere-rest-api";
import { AxiosResponse } from "axios";
import { Store } from "vuex";
import { ISiteWhereUIState } from "./sitewhere-api-wrapper";
import { IUser, IUserCreateRequest, IUserSearchCriteria, IUserResponseFormat, IUserSearchResults } from "sitewhere-rest-api";
/**
 * Create a new system user.
 * @param store
 * @param payload
 */
export declare function createUser(store: Store<ISiteWhereUIState>, request: IUserCreateRequest): Promise<AxiosResponse<IUser>>;
/**
 * Get an existing system user by username.
 * @param store
 * @param username
 * @param format
 */
export declare function getUser(store: Store<ISiteWhereUIState>, username: string, format: IUserResponseFormat): Promise<AxiosResponse<IUser>>;
/**
 * Update an existing system user.
 * @param store
 * @param username
 * @param request
 */
export declare function updateUser(store: Store<ISiteWhereUIState>, username: string, request: IUserCreateRequest): Promise<AxiosResponse<IUser>>;
/**
 * Delete an existing system user.
 * @param store
 * @param username
 */
export declare function deleteUser(store: Store<ISiteWhereUIState>, username: string): Promise<AxiosResponse<IUser>>;
/**
 * List users that match the given criteria.
 * @param store
 * @param criteria
 * @param format
 */
export declare function listUsers(store: Store<ISiteWhereUIState>, criteria: IUserSearchCriteria, format: IUserResponseFormat): Promise<AxiosResponse<IUserSearchResults>>;
/**
 * List roles that match the given criteria.
 * @param store
 * @param criteria
 * @param format
 */
export declare function listRoles(store: Store<ISiteWhereUIState>, criteria: IRoleSearchCriteria, format: IRoleResponseFormat): Promise<AxiosResponse<IRoleSearchResults>>;
