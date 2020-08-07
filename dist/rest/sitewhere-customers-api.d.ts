import { AxiosResponse } from "axios";
import { Store } from "vuex";
import { ISiteWhereUIState } from "./sitewhere-api-wrapper";
import { ICustomerCreateRequest, ICustomer, ICustomerSearchCriteria, ICustomerResponseFormat, ICustomerSearchResults, ISearchCriteria, IDateRangeSearchCriteria, IDeviceAssignmentResponseFormat, IDeviceAssignmentSearchResults, IDeviceAssignmentSummarySearchResults, IDeviceLocationSearchResults, IDeviceMeasurementSearchResults, IDeviceAlertSearchResults, IDeviceLocationResponseFormat, IDeviceMeasurementResponseFormat, IDeviceAlertResponseFormat } from "sitewhere-rest-api";
/**
 * Create a new customer.
 * @param store
 * @param request
 */
export declare function createCustomer(store: Store<ISiteWhereUIState>, request: ICustomerCreateRequest): Promise<AxiosResponse<ICustomer>>;
/**
 * Get customer by token.
 * @param store
 * @param token
 * @param format
 */
export declare function getCustomer(store: Store<ISiteWhereUIState>, token: string, format: ICustomerResponseFormat): Promise<AxiosResponse<ICustomer>>;
/**
 * Update an existing customer.
 * @param store
 * @param token
 * @param request
 */
export declare function updateCustomer(store: Store<ISiteWhereUIState>, token: string, request: ICustomerCreateRequest): Promise<AxiosResponse<ICustomer>>;
/**
 * List customers that match the given criteria.
 * @param store
 * @param criteria
 * @param format
 */
export declare function listCustomers(store: Store<ISiteWhereUIState>, criteria: ICustomerSearchCriteria, format: ICustomerResponseFormat): Promise<AxiosResponse<ICustomerSearchResults>>;
/**
 * Delete an existing customer.
 * @param store
 * @param token
 */
export declare function deleteCustomer(store: Store<ISiteWhereUIState>, token: string): Promise<AxiosResponse<ICustomer>>;
/**
 * List device assignments for a customer based on criteria.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
export declare function listAssignmentsForCustomer(store: Store<ISiteWhereUIState>, token: string, criteria: ISearchCriteria, format: IDeviceAssignmentResponseFormat): Promise<AxiosResponse<IDeviceAssignmentSearchResults>>;
/**
 * List assignments for customer in summary format.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
export declare function listAssignmentSummariesForCustomer(store: Store<ISiteWhereUIState>, token: string, criteria: ISearchCriteria, format: IDeviceAssignmentResponseFormat): Promise<AxiosResponse<IDeviceAssignmentSummarySearchResults>>;
/**
 * List device locations for a customer based on criteria.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
export declare function listLocationsForCustomer(store: Store<ISiteWhereUIState>, token: string, criteria?: IDateRangeSearchCriteria, format?: IDeviceLocationResponseFormat): Promise<AxiosResponse<IDeviceLocationSearchResults>>;
/**
 * List device measurements for a customer based on criteria.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
export declare function listMeasurementsForCustomer(store: Store<ISiteWhereUIState>, token: string, criteria?: IDateRangeSearchCriteria, format?: IDeviceMeasurementResponseFormat): Promise<AxiosResponse<IDeviceMeasurementSearchResults>>;
/**
 * List device alerts for a customer based on criteria.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
export declare function listAlertsForCustomer(store: Store<ISiteWhereUIState>, token: string, criteria?: IDateRangeSearchCriteria, format?: IDeviceAlertResponseFormat): Promise<AxiosResponse<IDeviceAlertSearchResults>>;
