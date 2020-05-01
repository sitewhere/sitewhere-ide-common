import { AxiosResponse } from "axios";
import { Store } from "vuex";
import { ISiteWhereUIState } from "./sitewhere-api-wrapper";
import { IBatchOperation, IBatchOperationSearchCriteria, IBatchOperationResponseFormat, IBatchElementResponseFormat, IBatchCommandInvocationRequest, IInvocationByDeviceCriteriaRequest, IInvocationByAssignmentCriteriaRequest, IBatchOperationSearchResults, IBatchElementSearchResults, ISearchCriteria } from "sitewhere-rest-api";
/**
 * Get batch operation by token.
 * @param store
 * @param token
 * @param format
 */
export declare function getBatchOperation(store: Store<ISiteWhereUIState>, token: string, format: IBatchOperationResponseFormat): Promise<AxiosResponse<IBatchOperation>>;
/**
 * List batch operations that match criteria.
 * @param store
 * @param criteria
 * @param format
 */
export declare function listBatchOperations(store: Store<ISiteWhereUIState>, criteria: IBatchOperationSearchCriteria, format: IBatchOperationResponseFormat): Promise<AxiosResponse<IBatchOperationSearchResults>>;
/**
 * List batch operation elements that match criteria.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
export declare function listBatchOperationElements(store: Store<ISiteWhereUIState>, token: string, criteria: ISearchCriteria, format: IBatchElementResponseFormat): Promise<AxiosResponse<IBatchElementSearchResults>>;
/**
 * Create a batch command invocation.
 * @param store
 * @param request
 */
export declare function createBatchCommandInvocation(store: Store<ISiteWhereUIState>, request: IBatchCommandInvocationRequest): Promise<AxiosResponse<IBatchOperation>>;
/**
 * Create command invocations based on device criteria.
 * @param store
 * @param request
 */
export declare function createInvocationsByDeviceCriteria(store: Store<ISiteWhereUIState>, request: IInvocationByDeviceCriteriaRequest): Promise<AxiosResponse<IBatchOperation>>;
/**
 * Create command invocations based on assignment criteria.
 * @param store
 * @param request
 */
export declare function createInvocationsByAssignmentCriteria(store: Store<ISiteWhereUIState>, request: IInvocationByAssignmentCriteriaRequest): Promise<AxiosResponse<IBatchOperation>>;
