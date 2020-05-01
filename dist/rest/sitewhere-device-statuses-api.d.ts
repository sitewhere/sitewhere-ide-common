import { AxiosResponse } from "axios";
import { Store } from "vuex";
import { ISiteWhereUIState } from "./sitewhere-api-wrapper";
import { IDeviceStatusSearchCriteria, IDeviceStatusResponseFormat, IDeviceStatusSearchResults } from "sitewhere-rest-api";
/**
 * List device statuses that match the given criteria.
 * @param store
 * @param criteria
 * @param format
 */
export declare function listDeviceStatuses(store: Store<ISiteWhereUIState>, criteria: IDeviceStatusSearchCriteria, format: IDeviceStatusResponseFormat): Promise<AxiosResponse<IDeviceStatusSearchResults>>;
