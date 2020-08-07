import { AxiosResponse } from "axios";
import { Store } from "vuex";
import { ISiteWhereUIState } from "./sitewhere-api-wrapper";
import { IAreaCreateRequest, IArea, IAreaSearchCriteria, IAreaResponseFormat, IAreaSearchResults, ISearchCriteria, IDateRangeSearchCriteria, IDeviceAssignmentResponseFormat, IDeviceAssignmentSearchResults, IDeviceAssignmentSummarySearchResults, IDeviceLocationSearchResults, IDeviceMeasurementSearchResults, IDeviceAlertSearchResults, IDeviceLocationResponseFormat, IDeviceMeasurementResponseFormat, IDeviceAlertResponseFormat } from "sitewhere-rest-api";
/**
 * Create a new area.
 * @param store
 * @param request
 */
export declare function createArea(store: Store<ISiteWhereUIState>, request: IAreaCreateRequest): Promise<AxiosResponse<IArea>>;
/**
 * Get an area by token.
 * @param store
 * @param token
 * @param format
 */
export declare function getArea(store: Store<ISiteWhereUIState>, token: string, format: IAreaResponseFormat): Promise<AxiosResponse<IArea>>;
/**
 * Update an existing area.
 * @param store
 * @param token
 * @param request
 */
export declare function updateArea(store: Store<ISiteWhereUIState>, token: string, request: IAreaCreateRequest): Promise<AxiosResponse<IArea>>;
/**
 * List areas that match criteria.
 * @param store
 * @param criteria
 * @param format
 */
export declare function listAreas(store: Store<ISiteWhereUIState>, criteria: IAreaSearchCriteria, format: IAreaResponseFormat): Promise<AxiosResponse<IAreaSearchResults>>;
/**
 * Delete an area.
 * @param store
 * @param token
 */
export declare function deleteArea(store: Store<ISiteWhereUIState>, token: string): Promise<AxiosResponse<IArea>>;
/**
 * List assignments for area based on criteria.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
export declare function listAssignmentsForArea(store: Store<ISiteWhereUIState>, token: string, criteria: ISearchCriteria, format: IDeviceAssignmentResponseFormat): Promise<AxiosResponse<IDeviceAssignmentSearchResults>>;
/**
 * List assignments for area in summary format.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
export declare function listAssignmentSummariesForArea(store: Store<ISiteWhereUIState>, token: string, criteria: ISearchCriteria, format: IDeviceAssignmentResponseFormat): Promise<AxiosResponse<IDeviceAssignmentSummarySearchResults>>;
/**
 * List device locations for area based on criteria.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
export declare function listLocationsForArea(store: Store<ISiteWhereUIState>, token: string, criteria?: IDateRangeSearchCriteria, format?: IDeviceLocationResponseFormat): Promise<AxiosResponse<IDeviceLocationSearchResults>>;
/**
 * List measurements for area based on criteria.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
export declare function listMeasurementsForArea(store: Store<ISiteWhereUIState>, token: string, criteria?: IDateRangeSearchCriteria, format?: IDeviceMeasurementResponseFormat): Promise<AxiosResponse<IDeviceMeasurementSearchResults>>;
/**
 * List alerts for area based on criteria.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
export declare function listAlertsForArea(store: Store<ISiteWhereUIState>, token: string, criteria: IDateRangeSearchCriteria, format?: IDeviceAlertResponseFormat): Promise<AxiosResponse<IDeviceAlertSearchResults>>;
