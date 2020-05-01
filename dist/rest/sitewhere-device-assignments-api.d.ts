import { AxiosResponse } from "axios";
import { Store } from "vuex";
import { ISiteWhereUIState } from "./sitewhere-api-wrapper";
import { IDeviceAssignmentCreateRequest, IDeviceAssignment, IDeviceAssignmentSimpleCriteria, IDeviceAssignmentSearchCriteria, IDeviceAssignmentResponseFormat, IDeviceAssignmentSearchResults, IDeviceMeasurementCreateRequest, IDeviceMeasurement, IChartSeries, IDeviceLocationCreateRequest, IDeviceLocation, IDeviceAlertCreateRequest, IDeviceAlert, IDeviceCommandInvocationCreateRequest, IDeviceCommandInvocation, IDeviceMeasurementSearchResults, IDeviceLocationSearchResults, IDeviceAlertSearchResults, IDeviceCommandInvocationSearchResults, IDeviceCommandResponseSearchResults, IDateRangeSearchCriteria, IDeviceMeasurementResponseFormat, IDeviceAlertResponseFormat, IDeviceLocationResponseFormat, IDeviceCommandInvocationResponseFormat, IDeviceCommandResponseResponseFormat } from "sitewhere-rest-api";
/**
 * Create a device assignment.
 * @param store
 * @param request
 */
export declare function createDeviceAssignment(store: Store<ISiteWhereUIState>, request: IDeviceAssignmentCreateRequest): Promise<AxiosResponse<IDeviceAssignment>>;
/**
 * Get a device assignment by token.
 * @param store
 * @param token
 * @param format
 */
export declare function getDeviceAssignment(store: Store<ISiteWhereUIState>, token: string, format: IDeviceAssignmentResponseFormat): Promise<AxiosResponse<IDeviceAssignment>>;
/**
 * List device assignments that match criteria.
 * @param store
 * @param criteria
 * @param format
 */
export declare function listDeviceAssignments(store: Store<ISiteWhereUIState>, criteria: IDeviceAssignmentSimpleCriteria, format: IDeviceAssignmentResponseFormat): Promise<AxiosResponse<IDeviceAssignmentSearchResults>>;
/**
 * Search device assignments that match criteria.
 * @param store
 * @param criteria
 * @param format
 */
export declare function searchDeviceAssignments(store: Store<ISiteWhereUIState>, criteria: IDeviceAssignmentSearchCriteria, format: IDeviceAssignmentResponseFormat): Promise<AxiosResponse<IDeviceAssignmentSearchResults>>;
/**
 * Delete an existing device assignment.
 * @param store
 * @param token
 */
export declare function deleteDeviceAssignment(store: Store<ISiteWhereUIState>, token: string): Promise<AxiosResponse<IDeviceAssignment>>;
/**
 * Create measurement event for assignment.
 * @param store
 * @param token
 * @param request
 */
export declare function createMeasurementsForAssignment(store: Store<ISiteWhereUIState>, token: string, request: IDeviceMeasurementCreateRequest): Promise<AxiosResponse<IDeviceMeasurement>>;
/**
 * List measurement events for assignment that match criteria.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
export declare function listMeasurementsForAssignment(store: Store<ISiteWhereUIState>, token: string, criteria: IDateRangeSearchCriteria, format: IDeviceMeasurementResponseFormat): Promise<AxiosResponse<IDeviceMeasurementSearchResults>>;
/**
 * List measurement events for assignment in chart series format.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
export declare function listMeasurementsForAssignmentAsChartSeries(store: Store<ISiteWhereUIState>, token: string, criteria: IDateRangeSearchCriteria, format: IDeviceMeasurementResponseFormat): Promise<AxiosResponse<IChartSeries<number>>>;
/**
 * Create location event for a device assignment.
 * @param store
 * @param token
 * @param request
 */
export declare function createLocationForAssignment(store: Store<ISiteWhereUIState>, token: string, request: IDeviceLocationCreateRequest): Promise<AxiosResponse<IDeviceLocation>>;
/**
 * List location events for assignment that match criteria.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
export declare function listLocationsForAssignment(store: Store<ISiteWhereUIState>, token: string, criteria: IDateRangeSearchCriteria, format: IDeviceLocationResponseFormat): Promise<AxiosResponse<IDeviceLocationSearchResults>>;
/**
 * Create alert event for a device assignment.
 * @param store
 * @param token
 * @param request
 */
export declare function createAlertForAssignment(store: Store<ISiteWhereUIState>, token: string, request: IDeviceAlertCreateRequest): Promise<AxiosResponse<IDeviceAlert>>;
/**
 * List alert events for an assignment that match criteria.
 * @param store
 * @param token
 * @param criteria
 */
export declare function listAlertsForAssignment(store: Store<ISiteWhereUIState>, token: string, criteria: IDateRangeSearchCriteria, format: IDeviceAlertResponseFormat): Promise<AxiosResponse<IDeviceAlertSearchResults>>;
/**
 * Create command invocation event for an assignment.
 * @param store
 * @param token
 * @param request
 */
export declare function createCommandInvocationForAssignment(store: Store<ISiteWhereUIState>, token: string, request: IDeviceCommandInvocationCreateRequest): Promise<AxiosResponse<IDeviceCommandInvocation>>;
/**
 * Schedule command invocation event for a future time.
 * @param store
 * @param token
 * @param scheduleToken
 * @param request
 */
export declare function scheduleCommandInvocation(store: Store<ISiteWhereUIState>, token: string, scheduleToken: string, request: IDeviceCommandInvocationCreateRequest): Promise<AxiosResponse<IDeviceCommandInvocation>>;
/**
 * List command invocation events for assignment that match criteria.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
export declare function listCommandInvocationsForAssignment(store: Store<ISiteWhereUIState>, token: string, criteria: IDateRangeSearchCriteria, format: IDeviceCommandInvocationResponseFormat): Promise<AxiosResponse<IDeviceCommandInvocationSearchResults>>;
/**
 * List command response events for assignment that match criteria.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
export declare function listCommandResponsesForAssignment(store: Store<ISiteWhereUIState>, token: string, criteria: IDateRangeSearchCriteria, format: IDeviceCommandResponseResponseFormat): Promise<AxiosResponse<IDeviceCommandResponseSearchResults>>;
/**
 * Release an active device assignment.
 * @param store
 * @param token
 */
export declare function releaseAssignment(store: Store<ISiteWhereUIState>, token: string): Promise<AxiosResponse<IDeviceAssignment>>;
/**
 * Mark a device assignment as missing.
 * @param store
 * @param token
 */
export declare function missingAssignment(store: Store<ISiteWhereUIState>, token: string): Promise<AxiosResponse<IDeviceAssignment>>;
