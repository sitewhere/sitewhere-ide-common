import { API } from "sitewhere-rest-api";
import { AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import { Store } from "vuex";
import { ISiteWhereUIState, createCoreApiCall, loaderWrapper } from "./sitewhere-api-wrapper";
import {
  IDeviceCommandSearchCriteria,
  IDeviceCommandResponseFormat,
  IDeviceCommandSearchResults,
  IDeviceCommandNamespaceSearchResults
} from "sitewhere-rest-api";

/**
 * List device commands matching criteria.
 * @param store
 * @param criteria
 * @param format
 */
export function listDeviceCommands(
  store: Store<ISiteWhereUIState>,
  criteria: IDeviceCommandSearchCriteria,
  format: IDeviceCommandResponseFormat
): Promise<AxiosResponse<IDeviceCommandSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceCommandSearchResults
  > = API.DeviceCommands.listDeviceCommands(axios, criteria, format);
  return loaderWrapper(store, api);
}

/**
 * List device commands matching criteria. Organize results by namespace.
 * @param store
 * @param criteria
 * @param format
 */
export function listDeviceCommandsByNamespace(
  store: Store<ISiteWhereUIState>,
  criteria: IDeviceCommandSearchCriteria,
  format: IDeviceCommandResponseFormat
): Promise<AxiosResponse<IDeviceCommandNamespaceSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceCommandNamespaceSearchResults
  > = API.DeviceCommands.listDeviceCommandsForNamespace(
    axios,
    criteria,
    format
  );
  return loaderWrapper(store, api);
}
