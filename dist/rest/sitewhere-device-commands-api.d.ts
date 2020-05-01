import { AxiosResponse } from "axios";
import { Store } from "vuex";
import { ISiteWhereUIState } from "./sitewhere-api-wrapper";
import { IDeviceCommandSearchCriteria, IDeviceCommandResponseFormat, IDeviceCommandSearchResults, IDeviceCommandNamespaceSearchResults } from "sitewhere-rest-api";
/**
 * List device commands matching criteria.
 * @param store
 * @param criteria
 * @param format
 */
export declare function listDeviceCommands(store: Store<ISiteWhereUIState>, criteria: IDeviceCommandSearchCriteria, format: IDeviceCommandResponseFormat): Promise<AxiosResponse<IDeviceCommandSearchResults>>;
/**
 * List device commands matching criteria. Organize results by namespace.
 * @param store
 * @param criteria
 * @param format
 */
export declare function listDeviceCommandsByNamespace(store: Store<ISiteWhereUIState>, criteria: IDeviceCommandSearchCriteria, format: IDeviceCommandResponseFormat): Promise<AxiosResponse<IDeviceCommandNamespaceSearchResults>>;
