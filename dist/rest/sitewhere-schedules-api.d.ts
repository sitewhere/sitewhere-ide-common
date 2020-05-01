import { AxiosResponse } from "axios";
import { Store } from "vuex";
import { ISiteWhereUIState } from "./sitewhere-api-wrapper";
import { IScheduleCreateRequest, ISchedule, IScheduleSearchCriteria, IScheduleResponseFormat, IScheduleSearchResults } from "sitewhere-rest-api";
/**
 * Create a new schedule.
 * @param store
 * @param request
 */
export declare function createSchedule(store: Store<ISiteWhereUIState>, request: IScheduleCreateRequest): Promise<AxiosResponse<ISchedule>>;
/**
 * Get schedule by token.
 * @param store
 * @param token
 * @param format
 */
export declare function getSchedule(store: Store<ISiteWhereUIState>, token: string, format: IScheduleResponseFormat): Promise<AxiosResponse<ISchedule>>;
/**
 * Update an existing schedule.
 * @param store
 * @param token
 * @param request
 */
export declare function updateSchedule(store: Store<ISiteWhereUIState>, token: string, request: IScheduleCreateRequest): Promise<AxiosResponse<ISchedule>>;
/**
 * Delete an existing schedule.
 * @param store
 * @param token
 */
export declare function deleteSchedule(store: Store<ISiteWhereUIState>, token: string): Promise<AxiosResponse<ISchedule>>;
/**
 * List schedules that match criteria.
 * @param store
 * @param criteria
 * @param format
 */
export declare function listSchedules(store: Store<ISiteWhereUIState>, criteria: IScheduleSearchCriteria, format: IScheduleResponseFormat): Promise<AxiosResponse<IScheduleSearchResults>>;
