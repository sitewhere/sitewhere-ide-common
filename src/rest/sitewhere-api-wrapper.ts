import * as SiteWhere from "sitewhere-rest-api";
import { AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import { IRemotes, IAlertMessage } from "../libraries/application-model";
import { INavigationSection } from "../libraries/interfaces";
import { IUser, ITenant } from "sitewhere-rest-api";
import { Store } from "vuex";

/**
 * SiteWhere user interface state.
 */
export interface ISiteWhereUIState {
  remotes: IRemotes;
  protocol?: string;
  server?: string;
  port?: number;
  jwt?: string;
  user?: IUser;
  authToken?: string;
  authTenants?: any;
  settings?: any;
  selectedTenant?: ITenant;
  currentSection?: INavigationSection;
  loading?: boolean;
  error?: boolean;
  message?: IAlertMessage;
}

/**
 * Create URL for core API request.
 * @param store
 */
export function createCoreApiUrl(store: Store<ISiteWhereUIState>): string {
  let get = store.getters;
  return `${get.protocol}://${get.server}:${get.port}/sitewhere/api/`;
}

/**
 * Create URL for auth API request.
 * @param store
 */
export function createAuthApiUrl(store: Store<ISiteWhereUIState>): string {
  let get = store.getters;
  return `${get.protocol}://${get.server}:${get.port}/sitewhere/authapi/`;
}

/**
 * Create URL for web socket request.
 * @param store
 */
export function createAdminWebSocketUrl(
  store: Store<ISiteWhereUIState>
): string {
  let get = store.getters;
  return `${get.protocol}://${get.server}:${get.port}/sitewhere/ws/admin/`;
}

/**
 * Create Axios instance for making a core API call.
 * @param store
 */
export function createCoreApiCall(
  store: Store<ISiteWhereUIState>
): AxiosInstance {
  var baseUrl = createCoreApiUrl(store);
  var jwt = store.getters.jwt;
  var tenantId = store.getters.selectedTenant
    ? store.getters.selectedTenant.token
    : "";
  var tenantAuth = store.getters.selectedTenant
    ? store.getters.selectedTenant.authenticationToken
    : "";
  return SiteWhere.Auth.createJwtRequest(baseUrl, jwt, tenantId, tenantAuth);
}

/**
 * Create Axios instance for making auth API call.
 * @param store
 */
export function createAuthApiCall(
  store: Store<ISiteWhereUIState>
): AxiosInstance {
  var baseUrl = createAuthApiUrl(store);
  var authToken = store.getters.authToken;
  return SiteWhere.Auth.createBasicAuthRequest(baseUrl, authToken);
}

/**
 * Wrapper for API calls.
 * @param store
 * @param apiCall
 */
export function loaderWrapper<T>(
  store: Store<ISiteWhereUIState>,
  apiCall: AxiosPromise<T>
): Promise<AxiosResponse<T>> {
  return new Promise<AxiosResponse<T>>((resolve, reject) => {
    store.commit("startLoading");
    apiCall
      .then(function (response) {
        store.commit("stopLoading");
        store.commit("error", null);
        resolve(response);
      })
      .catch(function (e) {
        store.commit("stopLoading");
        store.commit("error", e);
        reject(e);
      });
  });
}

/**
 * Perform an authenticated get for an image.
 * @param store
 * @param imageUrl
 */
export function imageAuthGet(
  store: Store<ISiteWhereUIState>,
  imageUrl: string
) {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api = axios.get(imageUrl, { responseType: "blob" });
  return loaderWrapper(store, api);
}

/**
 * Get a JWT based on credentials passed with basic auth.
 * @param store
 */
export function getJwt(
  store: Store<ISiteWhereUIState>
): Promise<AxiosResponse<any>> {
  let axios: AxiosInstance = createAuthApiCall(store);
  let api = SiteWhere.AuthAPI.Jwt.getJwt(axios);
  return loaderWrapper(store, api);
}
