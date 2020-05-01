import { API } from "sitewhere-rest-api";
import { AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import { Store } from "vuex";
import { ISiteWhereUIState, createCoreApiCall, loaderWrapper } from "./sitewhere-api-wrapper";
import {
  IBatchOperation,
  IBatchOperationSearchCriteria,
  IBatchOperationResponseFormat,
  IBatchElementResponseFormat,
  IBatchCommandInvocationRequest,
  IInvocationByDeviceCriteriaRequest,
  IInvocationByAssignmentCriteriaRequest,
  IBatchOperationSearchResults,
  IBatchElementSearchResults,
  ISearchCriteria
} from "sitewhere-rest-api";

/**
 * Get batch operation by token.
 * @param store
 * @param token
 * @param format
 */
export function getBatchOperation(
  store: Store<ISiteWhereUIState>,
  token: string,
  format: IBatchOperationResponseFormat
): Promise<AxiosResponse<IBatchOperation>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IBatchOperation
  > = API.BatchOperations.getBatchOperation(axios, token, format);
  return loaderWrapper(store, api);
}

/**
 * List batch operations that match criteria.
 * @param store
 * @param criteria
 * @param format
 */
export function listBatchOperations(
  store: Store<ISiteWhereUIState>,
  criteria: IBatchOperationSearchCriteria,
  format: IBatchOperationResponseFormat
): Promise<AxiosResponse<IBatchOperationSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IBatchOperationSearchResults
  > = API.BatchOperations.listBatchOperations(
    axios,
    criteria,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * List batch operation elements that match criteria.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
export function listBatchOperationElements(
  store: Store<ISiteWhereUIState>,
  token: string,
  criteria: ISearchCriteria,
  format: IBatchElementResponseFormat
): Promise<AxiosResponse<IBatchElementSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IBatchElementSearchResults
  > = API.BatchOperations.listBatchOperationElements(
    axios,
    token,
    criteria,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * Create a batch command invocation.
 * @param store
 * @param request
 */
export function createBatchCommandInvocation(
  store: Store<ISiteWhereUIState>,
  request: IBatchCommandInvocationRequest
): Promise<AxiosResponse<IBatchOperation>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IBatchOperation
  > = API.BatchOperations.createBatchCommandInvocation(
    axios,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * Create command invocations based on device criteria.
 * @param store
 * @param request
 */
export function createInvocationsByDeviceCriteria(
  store: Store<ISiteWhereUIState>,
  request: IInvocationByDeviceCriteriaRequest
): Promise<AxiosResponse<IBatchOperation>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IBatchOperation
  > = API.BatchOperations.createInvocationsByDeviceCriteria(
    axios,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * Create command invocations based on assignment criteria.
 * @param store
 * @param request
 */
export function createInvocationsByAssignmentCriteria(
  store: Store<ISiteWhereUIState>,
  request: IInvocationByAssignmentCriteriaRequest
): Promise<AxiosResponse<IBatchOperation>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IBatchOperation
  > = API.BatchOperations.createInvocationsByAssignmentCriteria(
    axios,
    request
  );
  return loaderWrapper(store, api);
}
