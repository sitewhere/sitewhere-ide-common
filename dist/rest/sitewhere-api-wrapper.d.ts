import { AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import { IRemoteInstances, IAlertMessage } from "../libraries/application-model";
import { INavigationSection } from "../libraries/application-model";
import { IUser, ITenant } from "sitewhere-rest-api";
import { Store } from "vuex";
/**
 * SiteWhere user interface state.
 */
export interface ISiteWhereUIState {
    remoteInstances: IRemoteInstances;
    instanceUrl?: string;
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
export declare function createCoreApiUrl(store: Store<ISiteWhereUIState>): string;
/**
 * Create URL for auth API request.
 * @param store
 */
export declare function createAuthApiUrl(store: Store<ISiteWhereUIState>): string;
/**
 * Create URL for web socket request.
 * @param store
 */
export declare function createAdminWebSocketUrl(store: Store<ISiteWhereUIState>): string;
/**
 * Create Axios instance for making a core API call.
 * @param store
 */
export declare function createCoreApiCall(store: Store<ISiteWhereUIState>): AxiosInstance;
/**
 * Create Axios instance for making auth API call.
 * @param store
 */
export declare function createAuthApiCall(store: Store<ISiteWhereUIState>): AxiosInstance;
/**
 * Wrapper for API calls.
 * @param store
 * @param apiCall
 */
export declare function loaderWrapper<T>(store: Store<ISiteWhereUIState>, apiCall: AxiosPromise<T>): Promise<AxiosResponse<T>>;
/**
 * Perform an authenticated get for an image.
 * @param store
 * @param imageUrl
 */
export declare function imageAuthGet(store: Store<ISiteWhereUIState>, imageUrl: string): Promise<AxiosResponse<any>>;
/**
 * Get a JWT based on credentials passed with basic auth.
 * @param store
 */
export declare function getJwt(store: Store<ISiteWhereUIState>): Promise<AxiosResponse<any>>;
