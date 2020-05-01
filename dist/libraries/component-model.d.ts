import { AxiosPromise } from "axios";
import { ISearchCriteria, IResponseFormat, ISearchResults } from "sitewhere-rest-api";
import { IPaging } from "./application-model";
import Vue from "vue";
import { Store } from "vuex";
import { Validation } from "vuelidate";
import VueRouter from "vue-router";
/** Support Vue extended with plugins */
export declare type VueAndPlugins = Vue & {
    $store: Store<any>;
    $v: Validation;
    $router: VueRouter;
};
/**
 * Base interface for creation dialog component.
 */
export interface ICreateDialogComponent<T, R> {
    /** Get wrapped dialog */
    getDialog(): IDialogComponent<T>;
    /** Open wrapped dialog */
    open(): void;
    /** Load dialog then open it */
    loadAndOpen(payload: T): void;
    /** Implemented in subclasses to save payload */
    save(payload: R): AxiosPromise<T> | T;
    /** Implemented in subclasses for after-save */
    afterSave(payload: T): void;
    /** Handle payload commit */
    commit(payload: R): void;
}
export interface IDeleteDialogComponent<T> {
    /** Prepare to load dialog */
    prepareLoad(identifier: string): AxiosPromise<T> | T;
    /** Called after record is loaded */
    afterLoad(record: T): void;
    /** Load data then open dialog */
    open(identifier: string): void;
    /** Return method to delete record */
    prepareDelete(record: T): AxiosPromise<T> | T;
    /** Action invoked when delete is clicked */
    delete(): void;
    /** Action invoked when cancel is clicked */
    cancel(): void;
    /** Called to open the dialog */
    closeDialog(): void;
    /** Called to show an error message */
    showError(error: string): void;
}
/**
 * Base interface for a detail component.
 */
export interface IDetailComponent<T> {
    token: string | null;
    record: T | null;
    loaded: boolean;
    /** Get parameter for route token */
    getTokenParameter(): string;
    /** Display record with the given token */
    display(token: string): void;
    /** Return promise for loading record */
    loadRecord(token: string | null): AxiosPromise<T>;
    /** Refresh */
    refresh(): void;
    /** Called after record is loaded */
    afterRecordLoaded(record: T): void;
}
/**
 * Base interface for a dialog component.
 */
export interface IDialogComponent<T> {
    /** Reset dialog content */
    reset(): void;
    /** Load dialog from model */
    load(model: T): void;
    /** Called to open the dialog */
    openDialog(): void;
    /** Called to open the dialog */
    closeDialog(): void;
    /** Called to show an error message */
    showError(error: string): void;
    /** Action invoked when create is clicked */
    onCreateClicked(e: any): void;
    /** Action invoked when cancel is clicked */
    onCancelClicked(e: any): void;
}
/**
 * Base interface for a dialog section.
 */
export interface IDialogSection {
    /** Reset section content */
    reset(): void;
    /** Validate fields in the dialog section */
    validate(): boolean;
    /** Load form data from an object */
    load(input: {}): void;
    /** Save form data to an object */
    save(): any;
}
/**
 * Base interface for an edit dialog.
 */
export interface IEditDialogComponent<T, R> {
    record: T | null;
    loaded: boolean;
    /** Get wrapped dialog */
    getDialog(): IDialogComponent<T>;
    /** Prepare load for the given identifier */
    prepareLoad(identifier: string | null): AxiosPromise<T> | T;
    /** Load record for identifer and open dialog */
    open(identifier: string | null): void;
    /** Implemented in subclasses to save payload */
    prepareSave(original: T, updated: R): AxiosPromise<T> | T;
    /** Handle payload commit */
    save(payload: R): void;
    /** Implemented in subclasses for after-save */
    afterSave(payload: T): void;
}
/**
 * Base interface for a header component.
 */
export interface IHeaderComponent<T> {
    record: T;
}
/**
 * Base interface for a list component.
 */
export interface IListComponent<T, S extends ISearchCriteria, F extends IResponseFormat, R extends ISearchResults<T>> {
    results: R | null;
    paging: IPaging | null;
    matches: T[];
    loaded: boolean;
    /** Update paging values and run query */
    onPagingUpdated(paging: IPaging): void;
    /** Build search criteria for list */
    buildSearchCriteria(): S;
    /** Build response format for list */
    buildResponseFormat(): F;
    /** Return promise for performing search */
    performSearch(criteria: S, format: F): AxiosPromise<R>;
    /** Refresh list contents */
    refresh(): void;
}
