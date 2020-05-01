import { API } from "sitewhere-rest-api";
import { AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import { Store } from "vuex";
import { ISiteWhereUIState, createCoreApiCall, loaderWrapper } from "./sitewhere-api-wrapper";
import {
  IDeviceStatusSearchCriteria,
  IDeviceStatusResponseFormat,
  IDeviceStatusSearchResults
} from "sitewhere-rest-api";

/**
 * List device statuses that match the given criteria.
 * @param store
 * @param criteria
 * @param format
 */
export function listDeviceStatuses(
  store: Store<ISiteWhereUIState>,
  criteria: IDeviceStatusSearchCriteria,
  format: IDeviceStatusResponseFormat
): Promise<AxiosResponse<IDeviceStatusSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceStatusSearchResults
  > = API.DeviceStatuses.listDeviceStatuses(axios, criteria, format);
  return loaderWrapper(store, api);
}
