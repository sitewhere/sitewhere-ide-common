import { AxiosResponse } from "axios";
import { Store } from "vuex";
import { ISiteWhereUIState } from "./sitewhere-api-wrapper";
import { IScriptCategory, IScriptTemplate, IScriptMetadata, IScriptCreateRequest, IScriptVersion, IScriptCloneRequest } from "sitewhere-rest-api";
/**
 * List all script categories for a functional area.
 * @param store
 * @param identifier
 */
export declare function listScriptCategories(store: Store<ISiteWhereUIState>, identifier: string): Promise<AxiosResponse<IScriptCategory[]>>;
/**
 * List script templates for a functional area and in a given category.
 * @param store
 * @param identifier
 * @param category
 */
export declare function listScriptTemplates(store: Store<ISiteWhereUIState>, identifier: string, category: string): Promise<AxiosResponse<IScriptTemplate[]>>;
/**
 * List metadata for microservice tenant scripts.
 * @param store
 * @param identifier
 * @param tenantToken
 */
export declare function listTenantScriptMetadata(store: Store<ISiteWhereUIState>, identifier: string, tenantToken: string): Promise<AxiosResponse<IScriptMetadata[]>>;
/**
 * List tenant scripts for functional area and belonging to category.
 * @param store
 * @param identifier
 * @param tenantToken
 * @param category
 */
export declare function listTenantScriptsForCategory(store: Store<ISiteWhereUIState>, identifier: string, tenantToken: string, category: string): Promise<AxiosResponse<IScriptMetadata[]>>;
/**
 * List scripts organized by category.
 * @param store
 * @param identifier
 * @param tenantToken
 */
export declare function listTenantScriptsByCategory(store: Store<ISiteWhereUIState>, identifier: string, tenantToken: string): Promise<AxiosResponse<IScriptCategory[]>>;
/**
 * Get metadata associated with a microservice tenant script.
 * @param store
 * @param identifier
 * @param tenantToken
 * @param scriptId
 */
export declare function getTenantScriptMetadata(store: Store<ISiteWhereUIState>, identifier: string, tenantToken: string, scriptId: string): Promise<AxiosResponse<IScriptMetadata>>;
/**
 * Create a new microservice tenant script.
 * @param store
 * @param identifier
 * @param tenantToken
 * @param request
 */
export declare function createTenantScript(store: Store<ISiteWhereUIState>, identifier: string, tenantToken: string, request: IScriptCreateRequest): Promise<AxiosResponse<IScriptMetadata>>;
/**
 * Get content for a microservice tenant script.
 * @param store
 * @param identifier
 * @param tenantToken
 * @param scriptId
 * @param versionId
 */
export declare function getTenantScriptContent(store: Store<ISiteWhereUIState>, identifier: string, tenantToken: string, scriptId: string, versionId: string): Promise<AxiosResponse<string>>;
/**
 * Update an existing microservice tenant script.
 * @param store
 * @param identifier
 * @param tenantToken
 * @param scriptId
 * @param versionId
 * @param request
 */
export declare function updateTenantScript(store: Store<ISiteWhereUIState>, identifier: string, tenantToken: string, scriptId: string, versionId: string, request: IScriptCreateRequest): Promise<AxiosResponse<IScriptMetadata>>;
/**
 * Clone an existing microservice tenant script.
 * @param store
 * @param identifier
 * @param tenantToken
 * @param scriptId
 * @param versionId
 * @param request
 */
export declare function cloneTenantScript(store: Store<ISiteWhereUIState>, identifier: string, tenantToken: string, scriptId: string, versionId: string, request: IScriptCloneRequest): Promise<AxiosResponse<IScriptVersion>>;
/**
 * Activate a microservice tenant script.
 * @param store
 * @param identifier
 * @param tenantToken
 * @param scriptId
 * @param versionId
 */
export declare function activateTenantScript(store: Store<ISiteWhereUIState>, identifier: string, tenantToken: string, scriptId: string, versionId: string): Promise<AxiosResponse<IScriptMetadata>>;
