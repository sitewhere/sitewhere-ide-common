import Vue from "vue";
import moment from "moment";
import { Component, Prop } from "vue-property-decorator";
import { IPaging } from "./navigation-model";
import { Store } from "vuex";
import { AxiosResponse } from "axios";
import { AxiosPromise } from "axios";
import { Route } from "vue-router";
import {
  ISearchCriteria,
  IResponseFormat,
  ISearchResults
} from "sitewhere-rest-api";

// @ts-ignore: Unused import
import { Validation } from "vuelidate";

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
 * Base class for components that display lists based on
 * SiteWhere REST services.
 */
@Component
export class ListComponent<
  T,
  S extends ISearchCriteria,
  F extends IResponseFormat,
  R extends ISearchResults<T>
> extends Vue {
  results: R | null = null;
  paging: IPaging | null = null;
  matches: T[] = [];
  loaded: boolean = false;

  /** Update paging values and run query */
  onPagingUpdated(paging: IPaging) {
    this.paging = paging;
    this.refresh();
  }

  /** Build search criteria for list */
  buildSearchCriteria(): S {
    throw new Error("Implement buildSearchCriteria()");
  }

  /** Build response format for list */
  buildResponseFormat(): F {
    throw new Error("Implement buildResponseFormat()");
  }

  /** Return promise for performing search */
  performSearch(
    store: Store<SiteWhereServerConnectivity>,
    criteria: S,
    format: F
  ): AxiosPromise<R> {
    throw new Error("Implement performSearch()");
  }

  // Refresh list contents.
  async refresh() {
    let criteria: S = this.buildSearchCriteria();
    let format: F = this.buildResponseFormat();
    if (this.paging) {
      criteria.pageNumber = this.paging.pageNumber;
      criteria.pageSize = this.paging.pageSize;
    }

    try {
      this.loaded = false;
      let promise: AxiosPromise<R> = this.performSearch(
        this.$store,
        criteria,
        format
      );
      let response: AxiosResponse<R> = await promise;
      this.results = response.data;
      this.matches = response.data.results;
    } catch (err) {
      handleError(err);
    }
    this.loaded = true;
  }
}

/**
 * Base class for components that display data for a single record
 * based on SiteWhere REST services.
 */
@Component
export class DetailComponent<T> extends Vue {
  token: string | null = null;
  record: T | null = null;
  loaded: boolean = false;

  // Get parameter for route token.
  getTokenParameter(): string {
    return "token";
  }

  // Called on initial create.
  created() {
    this.display(this.$route.params[this.getTokenParameter()]);
  }

  // Called when component is reused.
  beforeRouteUpdate(to: Route, from: Route, next: any) {
    console.log("Route updated", to);
    this.display(to.params.token);
    next();
  }

  // Display record with the given token.
  display(token: string) {
    this.token = token;
    this.refresh();
  }

  /** Return promise for loading record */
  loadRecord(
    store: Store<SiteWhereServerConnectivity>,
    token: string | null
  ): AxiosPromise<T> {
    throw new Error("Implement loadRecord()");
  }

  // Refresh list contents.
  async refresh() {
    try {
      this.loaded = false;
      let promise: AxiosPromise<T> = this.loadRecord(this.$store, this.token);
      let response: AxiosResponse<T> = await promise;
      this.record = response.data;
      this.afterRecordLoaded(this.record);
    } catch (err) {
      handleError(err);
    }
    this.loaded = true;
  }

  /** Called after record is loaded */
  afterRecordLoaded(record: T): void {
    console.log("Loaded record", record);
  }
}

/**
 * Base class for components that display header data for a
 * SiteWhere entity.
 */
@Component
export class HeaderComponent<T> extends Vue {
  @Prop() readonly record!: T;

  // Handle date formatting in a standard way.
  formatDate(date: Date) {
    return formatDate(date);
  }
}

/**
 * Base class for dialog components.
 */
@Component
export class DialogComponent<T> extends Vue {
  @Prop() readonly title!: string;
  @Prop() readonly width!: number;
  @Prop() readonly createLabel!: string;
  @Prop() readonly cancelLabel!: string;
  @Prop({ default: true }) readonly loaded!: boolean;

  dialogVisible: boolean = false;
  error: string | null = null;

  /** Reset dialog content */
  reset(): void {
    throw new Error("Reset not implemented in dialog.");
  }

  /** Load dialog from model */
  load(model: T): void {
    throw new Error("Load not implemented in dialog.");
  }

  /** Called to open the dialog */
  openDialog() {
    this.dialogVisible = true;
  }

  /** Called to open the dialog */
  closeDialog() {
    this.dialogVisible = false;
  }

  /** Called to show an error message */
  showError(error: string) {
    this.error = error;
  }

  /** Action invoked when create is clicked */
  onCreateClicked(e: any) {}

  /** Action invoked when cancel is clicked */
  onCancelClicked(e: any) {
    this.closeDialog();
  }
}

/**
 * Base class for create dialogs.
 */
export class CreateDialogComponent<T, R> extends Vue {
  /** Get wrapped dialog */
  getDialog(): DialogComponent<T> {
    throw new Error("Create dialog must implement getDialog().");
  }

  /** Open wrapped dialog */
  open() {
    this.getDialog().reset();
    this.getDialog().openDialog();
  }

  /** Implemented in subclasses to save payload */
  save(payload: R): AxiosPromise<T> {
    throw new Error("Create dialog must implement save().");
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: T): void {}

  /** Handle payload commit */
  async commit(payload: R) {
    try {
      let response: AxiosResponse<T> = await this.save(payload);
      let created: T = response.data;
      this.afterSave(created);
      this.$emit("created", created);
      this.getDialog().closeDialog();
    } catch (err) {
      handleError(err);
    }
  }
}

/**
 * Base class for edit dialogs.
 */
export class EditDialogComponent<T, R> extends Vue {
  record: T | null = null;
  loaded: boolean = false;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<T> {
    throw new Error("Edit dialog must implement getDialog().");
  }

  /**
   * Prepare load for the given identifier.
   * @param identifier
   */
  prepareLoad(identifier: string): AxiosPromise<T> {
    throw new Error("Edit dialog must implement load().");
  }

  /**
   * Load record for identifer and open dialog.
   * @param identifier
   */
  async open(identifier: string) {
    if (!identifier) {
      throw new Error("Identifier must be passed for edit.");
    }
    this.getDialog().openDialog();
    this.getDialog().reset();
    this.loaded = false;
    try {
      let response: AxiosResponse<T> = await this.prepareLoad(identifier);
      this.record = response.data;
      this.getDialog().load(this.record);
    } catch (err) {
      handleError(err);
    }
    this.loaded = true;
  }

  /** Implemented in subclasses to save payload */
  prepareSave(original: T, updated: R): AxiosPromise<T> {
    throw new Error("Edit dialog must implement save().");
  }

  /** Handle payload commit */
  async save(payload: R) {
    if (!this.record) {
      throw new Error("Unable to update. Record is null.");
    }
    try {
      let response: AxiosResponse<T> = await this.prepareSave(
        this.record,
        payload
      );
      let updated: T = response.data;
      this.afterSave(updated);
      this.$emit("updated", updated);
      this.getDialog().closeDialog();
    } catch (err) {
      handleError(err);
    }
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: T): void {}
}

/**
 * Base class for delete dialog components.
 */
@Component
export class DeleteDialogComponent<T> extends Vue {
  @Prop() readonly title!: string;
  @Prop() readonly width!: number;

  record: T | null = null;
  visible: boolean = false;
  error: string | null = null;

  /**
   * Load object to be deleted.
   * @param identifier
   */
  prepareLoad(identifier: string): AxiosPromise<T> {
    throw new Error("Load not implemented in dialog.");
  }

  /** Called after record is loaded */
  afterLoad(record: T): void {}

  /**
   * Load data, then open dialog.
   * @param identifier
   */
  async open(identifier: string) {
    try {
      let response: AxiosResponse<T> = await this.prepareLoad(identifier);
      this.record = response.data;
      this.visible = true;
      this.afterLoad(this.record);
    } catch (err) {
      handleError(err);
    }
  }

  /** Return method to delete record */
  prepareDelete(record: T): AxiosPromise<T> {
    throw new Error("Delete not implemented in dialog.");
  }

  /** Action invoked when delete is clicked */
  async delete() {
    if (!this.record) {
      throw new Error("Unable to delete. Record is null.");
    }
    try {
      let response: AxiosResponse<T> = await this.prepareDelete(this.record);
      this.record = response.data;
      this.$emit("deleted", this.record);
      this.closeDialog();
    } catch (err) {
      handleError(err);
    }
  }

  /** Action invoked when cancel is clicked */
  cancel() {
    this.closeDialog();
  }

  /** Called to open the dialog */
  closeDialog() {
    this.visible = false;
  }

  /** Called to show an error message */
  showError(error: string) {
    this.error = error;
  }
}

/**
 * Base class for dialog sections.
 */
@Component
export class DialogSection extends Vue {
  /** Called on component create */
  created(): void {
    this.reset();
  }

  /** Reset section content */
  reset(): void {
    throw new Error("Reset not implemented in dialog section.");
  }

  /** Validate fields in the dialog section */
  validate(): boolean {
    return true;
  }

  /** Load form data from an object */
  load(input: {}): void {}

  /** Save form data to an object */
  save(): {} {
    return {};
  }
}

/**
 * Common error handler.
 * @param err
 */
export function handleError(err: Error): void {
  console.log(err);
}

/**
 * Format date in YYYY-MM-DD H:mm:ss format. N/A for null.
 * @param date
 */
export function formatDate(date: Date) {
  if (!date) {
    return "N/A";
  }
  return moment(date).format("YYYY-MM-DD H:mm:ss");
}
