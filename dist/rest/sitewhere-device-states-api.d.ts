import { AxiosResponse } from "axios";
import { Store } from "vuex";
import { ISiteWhereUIState } from "./sitewhere-api-wrapper";
import { IDeviceStateSearchCriteria, IDeviceStateResponseFormat, IDeviceStateSearchResults } from "sitewhere-rest-api";
/**
 * Search device states.
 * @param store
 * @param criteria
 * @param format
 */
export declare function searchDeviceStates(store: Store<ISiteWhereUIState>, criteria: IDeviceStateSearchCriteria, format: IDeviceStateResponseFormat): Promise<AxiosResponse<IDeviceStateSearchResults>>;
