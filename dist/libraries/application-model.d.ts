/**
 * Error structure returned from HTTP requests.
 */
export interface IApplicationError {
    message: string;
    errorCode: number;
    errorDescription: string;
}
/**
 * Message that captures an alert (error or informational)
 */
export interface IAlertMessage {
    message: string;
    type: string;
}
/**
 * Information required to connect to a remote SiteWhere instance.
 */
export interface IRemoteConnection {
    id: string;
    name: string;
    protocol: string;
    host: string;
    port: number;
}
/**
 * Information about known remote SiteWhere instances.
 */
export interface IRemotes {
    connections: IRemoteConnection[];
    default: string;
}
import { Route } from "vue-router";
export declare type IPageSizes = {
    text: string;
    value: number;
}[];
/**
 * Information for
 */
export interface SiteWhereServerConnectivity {
    protocol?: string;
    server?: string;
    port?: number;
    jwt?: string;
}
/**
 * Annotates components that can have the current route injected.
 */
export interface WithRoute {
    $route: Route;
}
/**
 * Information used to track paging of results.
 */
export interface IPaging {
    pageNumber: number;
    pageSize: number;
}
/** Interface for toolbar action */
export interface IAction {
    id: string;
    title: string;
    icon: string;
}
/**
 * Metadata for presenting a navigation section.
 */
export interface INavigationSection {
    id: string;
    title: string;
    icon: string;
    route: string;
    longTitle: string;
    requireAll?: string[];
    subsections?: INavigationSection[];
}
export declare type ITableHeaders = {
    align?: string;
    sortable?: boolean;
    text?: string;
    value?: string;
}[];
/**
 * Common interface for interacting with tabbed components.
 */
export interface ITabbedComponent {
    setActiveTab(tab: number): void;
}
