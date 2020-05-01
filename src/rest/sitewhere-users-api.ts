import { API } from "sitewhere-rest-api";
import { AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import { Store } from "vuex";
import { ISiteWhereUIState, createCoreApiCall, loaderWrapper } from "./sitewhere-api-wrapper";
import {
  IUser,
  IUserCreateRequest,
  IUserSearchCriteria,
  IUserResponseFormat,
  IGrantedAuthorityHierarchyNode,
  IUserSearchResults
} from "sitewhere-rest-api";

/**
 * Create a new system user.
 * @param store
 * @param payload
 */
export function createUser(
  store: Store<ISiteWhereUIState>,
  request: IUserCreateRequest
): Promise<AxiosResponse<IUser>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IUser> = API.Users.createUser(axios, request);
  return loaderWrapper(store, api);
}

/**
 * Get an existing system user by username.
 * @param store
 * @param username
 * @param format
 */
export function getUser(
  store: Store<ISiteWhereUIState>,
  username: string,
  format: IUserResponseFormat
): Promise<AxiosResponse<IUser>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  var api: AxiosPromise<IUser> = API.Users.getUser(
    axios,
    username,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * Update an existing system user.
 * @param store
 * @param username
 * @param request
 */
export function updateUser(
  store: Store<ISiteWhereUIState>,
  username: string,
  request: IUserCreateRequest
): Promise<AxiosResponse<IUser>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IUser> = API.Users.updateUser(
    axios,
    username,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * Delete an existing system user.
 * @param store
 * @param username
 */
export function deleteUser(
  store: Store<ISiteWhereUIState>,
  username: string
): Promise<AxiosResponse<IUser>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IUser> = API.Users.deleteUser(
    axios,
    username
  );
  return loaderWrapper(store, api);
}

/**
 * List users that match the given criteria.
 * @param store
 * @param criteria
 * @param format
 */
export function listUsers(
  store: Store<ISiteWhereUIState>,
  criteria: IUserSearchCriteria,
  format: IUserResponseFormat
): Promise<AxiosResponse<IUserSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IUserSearchResults> = API.Users.listUsers(
    axios,
    criteria,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * Get parent/child hierarchy for granted authorities.
 * @param store
 */
export function getAuthoritiesHierarchy(
  store: Store<ISiteWhereUIState>
): Promise<AxiosResponse<IGrantedAuthorityHierarchyNode[]>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IGrantedAuthorityHierarchyNode[]
  > = API.Users.getAuthoritiesHierarchy(axios);
  return loaderWrapper(store, api);
}
