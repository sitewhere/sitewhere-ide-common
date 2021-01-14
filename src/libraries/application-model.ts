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
export interface IRemoteInstance {
  id: string;
  name: string;
  baseUrl: string;
}

/**
 * Information about known remote SiteWhere instances.
 */
export interface IRemoteInstances {
  instances: IRemoteInstance[];
  default: string;
}

import { Route } from "vue-router";

// Type declaration for page size options.
export type IPageSizes = { text: string; value: number }[];

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

// Defines structure of table headers.
export type ITableHeaders = {
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
