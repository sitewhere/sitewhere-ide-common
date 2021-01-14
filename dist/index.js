'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var moment = _interopDefault(require('moment'));
var sitewhereRestApi = require('sitewhere-rest-api');

/**
 * Enumeration of default microservice icons.
 */
(function (MicroserviceIcon) {
    MicroserviceIcon["AssetManagement"] = "devices_other";
    MicroserviceIcon["BatchOperations"] = "view_module";
    MicroserviceIcon["CommandDelivery"] = "call_made";
    MicroserviceIcon["DeviceManagement"] = "developer_board";
    MicroserviceIcon["DeviceRegistration"] = "add_box";
    MicroserviceIcon["DeviceState"] = "warning";
    MicroserviceIcon["EventMangement"] = "dynamic_feed";
    MicroserviceIcon["EventSources"] = "forward";
    MicroserviceIcon["InboundProcessing"] = "input";
    MicroserviceIcon["InstanceManagement"] = "language";
    MicroserviceIcon["LabelGeneration"] = "label";
    MicroserviceIcon["OutboundConnectors"] = "label";
    MicroserviceIcon["ScheduleManagement"] = "label";
})(exports.MicroserviceIcon || (exports.MicroserviceIcon = {}));
(function (NavigationIcon) {
    NavigationIcon["Tenant"] = "fa-layer-group";
    NavigationIcon["User"] = "fa-user";
    NavigationIcon["Global"] = "fa-globe";
    NavigationIcon["Device"] = "developer_board";
    NavigationIcon["DeviceType"] = "settings";
    NavigationIcon["DeviceAssignment"] = "link";
    NavigationIcon["DeviceCommand"] = "call_made";
    NavigationIcon["DeviceStatus"] = "warning";
    NavigationIcon["DeviceGroup"] = "apps";
    NavigationIcon["Customer"] = "account_balance";
    NavigationIcon["CustomerType"] = "settings";
    NavigationIcon["Area"] = "collections";
    NavigationIcon["AreaType"] = "settings";
    NavigationIcon["Asset"] = "devices_other";
    NavigationIcon["AssetType"] = "settings";
    NavigationIcon["BatchOperation"] = "view_module";
    NavigationIcon["Schedule"] = "access_alarm";
    NavigationIcon["Zone"] = "timeline";
    NavigationIcon["Location"] = "room";
    NavigationIcon["Alert"] = "warning";
    NavigationIcon["Measurement"] = "ballot";
    NavigationIcon["Emulator"] = "settings_remote";
    NavigationIcon["Add"] = "fa-plus-square";
    NavigationIcon["Edit"] = "fa-edit";
    NavigationIcon["Delete"] = "fa-trash";
    NavigationIcon["Filter"] = "fa-filter";
    NavigationIcon["Up"] = "fa-arrow-up";
    NavigationIcon["Script"] = "fa-code";
    NavigationIcon["Remotes"] = "fa-network-wired";
    NavigationIcon["Datastore"] = "fa-database";
    NavigationIcon["Settings"] = "fa-cogs";
})(exports.NavigationIcon || (exports.NavigationIcon = {}));

/**
 * Common error handler.
 * @param err
 */
function handleError(err) {
    console.log(err);
}
/** Get error response info */
function errorResponse(error) {
    return error.response;
}
/**
 * Show informational message in snackbar.
 * @param component
 * @param message
 */
function showMessage(component, message) {
    var alert = {
        message: message,
        type: "info"
    };
    component.$store.commit("message", alert);
    return alert;
}
/**
 * Show error message in snackbar.
 * @param component
 * @param message
 */
function showError(component, error) {
    var response = errorResponse(error);
    var alert = {
        message: response && response.data ? response.data.message : "Unknown error.",
        type: "error"
    };
    component.$store.commit("message", alert);
    return alert;
}
/**
 * Format date in YYYY-MM-DD H:mm:ss format. N/A for null.
 * @param date
 */
function formatDate(date) {
    if (!date) {
        return "N/A";
    }
    return moment(date).format("YYYY-MM-DD H:mm:ss");
}
/**
 * Format date in YYYY-MM-DD H:mm:ss format.
 * @param date
 */
function formatIso8601(date) {
    if (!date) {
        return null;
    }
    return moment(date).toISOString();
}
/**
 * Parse date in YYYY-MM-DD H:mm:ss format.
 * @param value
 */
function parseIso8601(value) {
    if (!value) {
        return null;
    }
    return moment(value).toDate();
}
/**
 * Tests whether a string is blank.
 * @param str
 */
function isBlank(str) {
    return !str || /^\s*$/.test(str);
}
/**
 * Short string with ellipsis if necessary.
 * @param val
 * @param max
 */
function ellipsis(val, max) {
    return val.length > max ? val.substring(0, max) + "..." : val;
}
/**
 * Rounds to four decimal places
 * @param val
 */
function fourDecimalPlaces(val) {
    return Number(Math.round(parseFloat(val + "e4")) + "e-4").toFixed(4);
}
/**
 * Converts metadata object into array.
 * @param meta
 */
function metadataToArray(meta) {
    var flat = [];
    if (meta) {
        for (var key in meta) {
            if (meta.hasOwnProperty(key)) {
                flat.push({ name: key, value: meta[key] });
            }
        }
    }
    return flat;
}
/**
 * Converts array to metadata object.
 * @param arrayMeta
 */
function arrayToMetadata(arrayMeta) {
    var metadata = {};
    if (arrayMeta) {
        for (var i = 0; i < arrayMeta.length; i++) {
            metadata[arrayMeta[i].name] = arrayMeta[i].value;
        }
    }
    return metadata;
}
/**
 * Indicates if logged-in user is authorized for all auths in list.
 * @param component
 * @param list
 */
function isAuthForAll(component, list) {
    var user = component.$store.getters.user;
    if (!user) {
        console.log("No user for permissions check.");
        return false;
    }
    return list.every(function (auth) { return user.authorities.indexOf(auth) > -1; });
}
/**
 * Routes to a applicaton-relative URL.
 * @param component
 * @param url
 */
function routeTo(component, url) {
    var tenant = component.$store.getters.selectedTenant;
    if (tenant) {
        var route = "/tenants/" + tenant.token + url;
        console.log("route to", route);
        component.$router.push(route);
    }
    else {
        console.log("tenant was not set");
    }
}
/**
 * Routes to device page for hardware id.
 * @param component
 * @param token
 */
function routeToDevice(component, token) {
    routeTo(component, "/devices/" + token);
}
/**
 * Returns paging value for all results.
 */
function pagingForAllResults() {
    return "page=1&pageSize=0";
}
/** Generate a unique id */
function generateUniqueId() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = crypto.getRandomValues(new Uint8Array(1))[0] % 16 | 0;
        var v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
/** Type guard to differentiate between responses */
function isAxiosResponse(response) {
    return response.data !== undefined;
}
/**
 * Move an element in an array from one index to another.
 * @param arr
 * @param old_index
 * @param new_index
 */
function arrayMove(arr, old_index, new_index) {
    while (old_index < 0) {
        old_index += arr.length;
    }
    while (new_index < 0) {
        new_index += arr.length;
    }
    if (new_index >= arr.length) {
        var k = new_index - arr.length;
        while (k-- + 1) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
}

/**
 * Create URL for core API request.
 * @param store
 */
function createCoreApiUrl(store) {
    var get = store.getters;
    return get.instanceUrl + "/api/";
}
/**
 * Create URL for auth API request.
 * @param store
 */
function createAuthApiUrl(store) {
    var get = store.getters;
    return get.instanceUrl + "/authapi/";
}
/**
 * Create URL for web socket request.
 * @param store
 */
function createAdminWebSocketUrl(store) {
    var get = store.getters;
    return get.instanceUrl + "/ws/admin/";
}
/**
 * Create Axios instance for making a core API call.
 * @param store
 */
function createCoreApiCall(store) {
    var baseUrl = createCoreApiUrl(store);
    var jwt = store.getters.jwt;
    var tenantId = store.getters.selectedTenant
        ? store.getters.selectedTenant.token
        : "";
    var tenantAuth = store.getters.selectedTenant
        ? store.getters.selectedTenant.authenticationToken
        : "";
    return sitewhereRestApi.Auth.createJwtRequest(baseUrl, jwt, tenantId, tenantAuth);
}
/**
 * Create Axios instance for making auth API call.
 * @param store
 */
function createAuthApiCall(store) {
    var baseUrl = createAuthApiUrl(store);
    var authToken = store.getters.authToken;
    return sitewhereRestApi.Auth.createBasicAuthRequest(baseUrl, authToken);
}
/**
 * Wrapper for API calls.
 * @param store
 * @param apiCall
 */
function loaderWrapper(store, apiCall) {
    return new Promise(function (resolve, reject) {
        store.commit("startLoading");
        apiCall
            .then(function (response) {
            store.commit("stopLoading");
            store.commit("error", null);
            resolve(response);
        })
            .catch(function (e) {
            store.commit("stopLoading");
            store.commit("error", e);
            reject(e);
        });
    });
}
/**
 * Perform an authenticated get for an image.
 * @param store
 * @param imageUrl
 */
function imageAuthGet(store, imageUrl) {
    var axios = createCoreApiCall(store);
    var api = axios.get(imageUrl, { responseType: "blob" });
    return loaderWrapper(store, api);
}
/**
 * Get a JWT based on credentials passed with basic auth.
 * @param store
 */
function getJwt(store) {
    var axios = createAuthApiCall(store);
    var api = sitewhereRestApi.AuthAPI.Jwt.getJwt(axios);
    return loaderWrapper(store, api);
}

/**
 * Create a new area type.
 * @param store
 * @param request
 */
function createAreaType(store, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.AreaTypes.createAreaType(axios, request);
    return loaderWrapper(store, api);
}
/**
 * Get an area type by token.
 * @param store
 * @param token
 * @param format
 */
function getAreaType(store, token, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.AreaTypes.getAreaType(axios, token, format);
    return loaderWrapper(store, api);
}
/**
 * Update an existing area type.
 * @param store
 * @param token
 * @param request
 */
function updateAreaType(store, token, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.AreaTypes.updateAreaType(axios, token, request);
    return loaderWrapper(store, api);
}
/**
 * List area types that match the given criteria.
 * @param store
 * @param criteria
 * @param format
 */
function listAreaTypes(store, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.AreaTypes.listAreaTypes(axios, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * Delete an existing area type.
 * @param store
 * @param token
 */
function deleteAreaType(store, token) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.AreaTypes.deleteAreaType(axios, token);
    return loaderWrapper(store, api);
}

/**
 * Create a new area.
 * @param store
 * @param request
 */
function createArea(store, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Areas.createArea(axios, request);
    return loaderWrapper(store, api);
}
/**
 * Get an area by token.
 * @param store
 * @param token
 * @param format
 */
function getArea(store, token, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Areas.getArea(axios, token, format);
    return loaderWrapper(store, api);
}
/**
 * Update an existing area.
 * @param store
 * @param token
 * @param request
 */
function updateArea(store, token, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Areas.updateArea(axios, token, request);
    return loaderWrapper(store, api);
}
/**
 * List areas that match criteria.
 * @param store
 * @param criteria
 * @param format
 */
function listAreas(store, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Areas.listAreas(axios, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * Delete an area.
 * @param store
 * @param token
 */
function deleteArea(store, token) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Areas.deleteArea(axios, token);
    return loaderWrapper(store, api);
}
/**
 * List assignments for area based on criteria.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
function listAssignmentsForArea(store, token, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Areas.listAssignmentsForArea(axios, token, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * List assignments for area in summary format.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
function listAssignmentSummariesForArea(store, token, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Areas.listAssignmentSummariesForArea(axios, token, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * List device locations for area based on criteria.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
function listLocationsForArea(store, token, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Areas.listLocationsForArea(axios, token, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * List measurements for area based on criteria.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
function listMeasurementsForArea(store, token, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Areas.listMeasurementsForArea(axios, token, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * List alerts for area based on criteria.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
function listAlertsForArea(store, token, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Areas.listAlertsForArea(axios, token, criteria, format);
    return loaderWrapper(store, api);
}

/**
 * Create a new asset type.
 * @param store
 * @param request
 */
function createAssetType(store, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.AssetTypes.createAssetType(axios, request);
    return loaderWrapper(store, api);
}
/**
 * Get asset type by token.
 * @param store
 * @param token
 * @param format
 */
function getAssetType(store, token, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.AssetTypes.getAssetType(axios, token, format);
    return loaderWrapper(store, api);
}
/**
 * Update an existing asset type.
 * @param store
 * @param token
 * @param request
 */
function updateAssetType(store, token, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.AssetTypes.updateAssetType(axios, token, request);
    return loaderWrapper(store, api);
}
/**
 * List asset types that match criteria.
 * @param store
 * @param criteria
 * @param format
 */
function listAssetTypes(store, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.AssetTypes.listAssetTypes(axios, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * Delete an existing asset type.
 * @param store
 * @param token
 */
function deleteAssetType(store, token) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.AssetTypes.deleteAssetType(axios, token);
    return loaderWrapper(store, api);
}

/**
 * Create a new asset.
 * @param store
 * @param request
 */
function createAsset(store, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Assets.createAsset(axios, request);
    return loaderWrapper(store, api);
}
/**
 * Get asset by token.
 * @param store
 * @param token
 * @param format
 */
function getAsset(store, token, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Assets.getAsset(axios, token, format);
    return loaderWrapper(store, api);
}
/**
 * Update an existing asset.
 * @param store
 * @param token
 * @param request
 */
function updateAsset(store, token, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Assets.updateAsset(axios, token, request);
    return loaderWrapper(store, api);
}
/**
 * List assets that match criteria.
 * @param store
 * @param criteria
 * @param format
 */
function listAssets(store, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Assets.listAssets(axios, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * Delete an existing asset.
 * @param store
 * @param token
 */
function deleteAsset(store, token) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Assets.deleteAsset(axios, token);
    return loaderWrapper(store, api);
}

/**
 * Get batch operation by token.
 * @param store
 * @param token
 * @param format
 */
function getBatchOperation(store, token, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.BatchOperations.getBatchOperation(axios, token, format);
    return loaderWrapper(store, api);
}
/**
 * List batch operations that match criteria.
 * @param store
 * @param criteria
 * @param format
 */
function listBatchOperations(store, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.BatchOperations.listBatchOperations(axios, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * List batch operation elements that match criteria.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
function listBatchOperationElements(store, token, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.BatchOperations.listBatchOperationElements(axios, token, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * Create a batch command invocation.
 * @param store
 * @param request
 */
function createBatchCommandInvocation(store, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.BatchOperations.createBatchCommandInvocation(axios, request);
    return loaderWrapper(store, api);
}
/**
 * Create command invocations based on device criteria.
 * @param store
 * @param request
 */
function createInvocationsByDeviceCriteria(store, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.BatchOperations.createInvocationsByDeviceCriteria(axios, request);
    return loaderWrapper(store, api);
}
/**
 * Create command invocations based on assignment criteria.
 * @param store
 * @param request
 */
function createInvocationsByAssignmentCriteria(store, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.BatchOperations.createInvocationsByAssignmentCriteria(axios, request);
    return loaderWrapper(store, api);
}

/**
 * Create a new customer type.
 * @param store
 * @param request
 */
function createCustomerType(store, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.CustomerTypes.createCustomerType(axios, request);
    return loaderWrapper(store, api);
}
/**
 * Get customer type by token.
 * @param store
 * @param token
 */
function getCustomerType(store, token, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.CustomerTypes.getCustomerType(axios, token, format);
    return loaderWrapper(store, api);
}
/**
 * Update an existing customer type.
 * @param store
 * @param token
 * @param request
 */
function updateCustomerType(store, token, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.CustomerTypes.updateCustomerType(axios, token, request);
    return loaderWrapper(store, api);
}
/**
 * List customer types that match the given criteria.
 * @param store
 * @param criteria
 * @param format
 */
function listCustomerTypes(store, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.CustomerTypes.listCustomerTypes(axios, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * Delete an existing customer type.
 * @param store
 * @param token
 */
function deleteCustomerType(store, token) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.CustomerTypes.deleteCustomerType(axios, token);
    return loaderWrapper(store, api);
}

/**
 * Create a new customer.
 * @param store
 * @param request
 */
function createCustomer(store, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Customers.createCustomer(axios, request);
    return loaderWrapper(store, api);
}
/**
 * Get customer by token.
 * @param store
 * @param token
 * @param format
 */
function getCustomer(store, token, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Customers.getCustomer(axios, token, format);
    return loaderWrapper(store, api);
}
/**
 * Update an existing customer.
 * @param store
 * @param token
 * @param request
 */
function updateCustomer(store, token, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Customers.updateCustomer(axios, token, request);
    return loaderWrapper(store, api);
}
/**
 * List customers that match the given criteria.
 * @param store
 * @param criteria
 * @param format
 */
function listCustomers(store, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Customers.listCustomers(axios, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * Delete an existing customer.
 * @param store
 * @param token
 */
function deleteCustomer(store, token) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Customers.deleteCustomer(axios, token);
    return loaderWrapper(store, api);
}
/**
 * List device assignments for a customer based on criteria.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
function listAssignmentsForCustomer(store, token, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Customers.listAssignmentsForCustomer(axios, token, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * List assignments for customer in summary format.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
function listAssignmentSummariesForCustomer(store, token, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Customers.listAssignmentSummariesForCustomer(axios, token, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * List device locations for a customer based on criteria.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
function listLocationsForCustomer(store, token, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Customers.listLocationsForCustomer(axios, token, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * List device measurements for a customer based on criteria.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
function listMeasurementsForCustomer(store, token, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Customers.listMeasurementsForCustomer(axios, token, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * List device alerts for a customer based on criteria.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
function listAlertsForCustomer(store, token, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Customers.listAlertsForCustomer(axios, token, criteria, format);
    return loaderWrapper(store, api);
}

/**
 * Create a device assignment.
 * @param store
 * @param request
 */
function createDeviceAssignment(store, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceAssignments.createDeviceAssignment(axios, request);
    return loaderWrapper(store, api);
}
/**
 * Get a device assignment by token.
 * @param store
 * @param token
 * @param format
 */
function getDeviceAssignment(store, token, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceAssignments.getDeviceAssignment(axios, token, format);
    return loaderWrapper(store, api);
}
/**
 * List device assignments that match criteria.
 * @param store
 * @param criteria
 * @param format
 */
function listDeviceAssignments(store, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceAssignments.listDeviceAssignments(axios, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * Search device assignments that match criteria.
 * @param store
 * @param criteria
 * @param format
 */
function searchDeviceAssignments(store, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceAssignments.searchDeviceAssignments(axios, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * Search device assignment summaries that match criteria.
 * @param store
 * @param criteria
 * @param format
 */
function searchDeviceAssignmentSummaries(store, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceAssignments.searchDeviceAssignmentSummaries(axios, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * Delete an existing device assignment.
 * @param store
 * @param token
 */
function deleteDeviceAssignment(store, token) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceAssignments.deleteDeviceAssignment(axios, token);
    return loaderWrapper(store, api);
}
/**
 * Create measurement event for assignment.
 * @param store
 * @param token
 * @param request
 */
function createMeasurementsForAssignment(store, token, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceAssignments.createMeasurementForAssignment(axios, token, request);
    return loaderWrapper(store, api);
}
/**
 * List measurement events for assignment that match criteria.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
function listMeasurementsForAssignment(store, token, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceAssignments.listMeasurementsForAssignment(axios, token, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * List measurement events for assignment in chart series format.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
function listMeasurementsForAssignmentAsChartSeries(store, token, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceAssignments.listMeasurementsForAssignmentAsChartSeries(axios, token, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * Create location event for a device assignment.
 * @param store
 * @param token
 * @param request
 */
function createLocationForAssignment(store, token, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceAssignments.createLocationForAssignment(axios, token, request);
    return loaderWrapper(store, api);
}
/**
 * List location events for assignment that match criteria.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
function listLocationsForAssignment(store, token, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceAssignments.listLocationsForAssignment(axios, token, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * Create alert event for a device assignment.
 * @param store
 * @param token
 * @param request
 */
function createAlertForAssignment(store, token, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceAssignments.createAlertForAssignment(axios, token, request);
    return loaderWrapper(store, api);
}
/**
 * List alert events for an assignment that match criteria.
 * @param store
 * @param token
 * @param criteria
 */
function listAlertsForAssignment(store, token, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceAssignments.listAlertsForAssignment(axios, token, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * Create command invocation event for an assignment.
 * @param store
 * @param token
 * @param request
 */
function createCommandInvocationForAssignment(store, token, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceAssignments.createCommandInvocationForAssignment(axios, token, request);
    return loaderWrapper(store, api);
}
/**
 * Schedule command invocation event for a future time.
 * @param store
 * @param token
 * @param scheduleToken
 * @param request
 */
function scheduleCommandInvocation(store, token, scheduleToken, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceAssignments.scheduleCommandInvocationForAssignment(axios, token, scheduleToken, request);
    return loaderWrapper(store, api);
}
/**
 * List command invocation events for assignment that match criteria.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
function listCommandInvocationsForAssignment(store, token, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceAssignments.listCommandInvocationsForAssignment(axios, token, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * List command response events for assignment that match criteria.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
function listCommandResponsesForAssignment(store, token, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceAssignments.listCommandResponsesForAssignment(axios, token, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * Release an active device assignment.
 * @param store
 * @param token
 */
function releaseAssignment(store, token) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceAssignments.releaseDeviceAssignment(axios, token);
    return loaderWrapper(store, api);
}
/**
 * Mark a device assignment as missing.
 * @param store
 * @param token
 */
function missingAssignment(store, token) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceAssignments.missingDeviceAssignment(axios, token);
    return loaderWrapper(store, api);
}

/**
 * List device commands matching criteria.
 * @param store
 * @param criteria
 * @param format
 */
function listDeviceCommands(store, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceCommands.listDeviceCommands(axios, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * List device commands matching criteria. Organize results by namespace.
 * @param store
 * @param criteria
 * @param format
 */
function listDeviceCommandsByNamespace(store, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceCommands.listDeviceCommandsForNamespace(axios, criteria, format);
    return loaderWrapper(store, api);
}

/**
 * Create a new device group.
 * @param store
 * @param request
 */
function createDeviceGroup(store, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceGroups.createDeviceGroup(axios, request);
    return loaderWrapper(store, api);
}
/**
 * Get device group by token.
 * @param store
 * @param token
 * @param format
 */
function getDeviceGroup(store, token, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceGroups.getDeviceGroup(axios, token, format);
    return loaderWrapper(store, api);
}
/**
 * Update an existing device group.
 * @param store
 * @param token
 * @param request
 */
function updateDeviceGroup(store, token, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceGroups.updateDeviceGroup(axios, token, request);
    return loaderWrapper(store, api);
}
/**
 * List device groups that match criteria.
 * @param store
 * @param criteria
 * @param format
 */
function listDeviceGroups(store, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceGroups.listDeviceGroups(axios, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * List device group elements that match criteria.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
function listDeviceGroupElements(store, token, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceGroups.listDeviceGroupElements(axios, token, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * Add one or more elements to a device group.
 * @param store
 * @param token
 * @param request
 */
function createDeviceGroupElements(store, token, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceGroups.createDeviceGroupElements(axios, token, request);
    return loaderWrapper(store, api);
}
/**
 * Delete an existing device group element.
 * @param store
 * @param token
 * @param elementId
 */
function deleteDeviceGroupElement(store, token, elementId) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceGroups.deleteDeviceGroupElement(axios, token, elementId);
    return loaderWrapper(store, api);
}
/**
 * Delete a device group.
 * @param store
 * @param token
 */
function deleteDeviceGroup(store, token) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceGroups.deleteDeviceGroup(axios, token);
    return loaderWrapper(store, api);
}

/**
 * Search device states.
 * @param store
 * @param criteria
 * @param format
 */
function searchDeviceStates(store, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceStates.searchDeviceStates(axios, criteria, format);
    return loaderWrapper(store, api);
}

/**
 * List device statuses that match the given criteria.
 * @param store
 * @param criteria
 * @param format
 */
function listDeviceStatuses(store, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceStatuses.listDeviceStatuses(axios, criteria, format);
    return loaderWrapper(store, api);
}

/**
 * Create a new device type.
 * @param store
 * @param request
 */
function createDeviceType(store, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceTypes.createDeviceType(axios, request);
    return loaderWrapper(store, api);
}
/**
 * Get device type by token.
 * @param store
 * @param token
 * @param format
 */
function getDeviceType(store, token, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceTypes.getDeviceType(axios, token, format);
    return loaderWrapper(store, api);
}
/**
 * Update an existing device type.
 * @param store
 * @param token
 * @param request
 */
function updateDeviceType(store, token, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceTypes.updateDeviceType(axios, token, request);
    return loaderWrapper(store, api);
}
/**
 * List device types that match criteria.
 * @param store
 * @param criteria
 * @param format
 */
function listDeviceTypes(store, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceTypes.listDeviceTypes(axios, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * Delete an existing device type.
 * @param store
 * @param token
 */
function deleteDeviceType(store, token) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceTypes.deleteDeviceType(axios, token);
    return loaderWrapper(store, api);
}
/**
 * Create new device command.
 * @param store
 * @param deviceTypeToken
 * @param request
 */
function createDeviceCommand(store, deviceTypeToken, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceTypes.createDeviceCommand(axios, deviceTypeToken, request);
    return loaderWrapper(store, api);
}
/**
 * Get device command by token.
 * @param store
 * @param deviceTypeToken
 * @param commandToken
 * @param format
 */
function getDeviceCommand(store, deviceTypeToken, commandToken, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceTypes.getDeviceCommand(axios, deviceTypeToken, commandToken, format);
    return loaderWrapper(store, api);
}
/**
 * Update an existing device command.
 * @param store
 * @param deviceTypeToken
 * @param commandToken
 * @param request
 */
function updateDeviceCommand(store, deviceTypeToken, commandToken, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceTypes.updateDeviceCommand(axios, deviceTypeToken, commandToken, request);
    return loaderWrapper(store, api);
}
/**
 * Delete an existing device command.
 * @param store
 * @param deviceTypeToken
 * @param commandToken
 */
function deleteDeviceCommand(store, deviceTypeToken, commandToken) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceTypes.deleteDeviceCommand(axios, deviceTypeToken, commandToken);
    return loaderWrapper(store, api);
}
/**
 * Create a new device status.
 * @param store
 * @param deviceTypeToken
 * @param request
 */
function createDeviceStatus(store, deviceTypeToken, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceTypes.createDeviceStatus(axios, deviceTypeToken, request);
    return loaderWrapper(store, api);
}
/**
 * Update an existing device status.
 * @param store
 * @param deviceTypeToken
 * @param statusToken
 * @param format
 */
function getDeviceStatus(store, deviceTypeToken, statusToken, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceTypes.getDeviceStatus(axios, deviceTypeToken, statusToken, format);
    return loaderWrapper(store, api);
}
/**
 * Update an existing device status.
 * @param store
 * @param deviceTypeToken
 * @param statusToken
 * @param request
 */
function updateDeviceStatus(store, deviceTypeToken, statusToken, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceTypes.updateDeviceStatus(axios, deviceTypeToken, statusToken, request);
    return loaderWrapper(store, api);
}
/**
 * Delete an existing device status.
 * @param store
 * @param deviceTypeToken
 * @param statusToken
 */
function deleteDeviceStatus(store, deviceTypeToken, statusToken) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.DeviceTypes.deleteDeviceStatus(axios, deviceTypeToken, statusToken);
    return loaderWrapper(store, api);
}

/**
 * Create a device.
 * @param store
 * @param request
 */
function createDevice(store, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Devices.createDevice(axios, request);
    return loaderWrapper(store, api);
}
/**
 * Get a device by token.
 * @param store
 * @param token
 */
function getDevice(store, token, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Devices.getDevice(axios, token, format);
    return loaderWrapper(store, api);
}
/**
 * Update an existing device.
 * @param store
 * @param token
 * @param request
 */
function updateDevice(store, token, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Devices.updateDevice(axios, token, request);
    return loaderWrapper(store, api);
}
/**
 * List devices that match criteria.
 * @param store
 * @param criteria
 * @param format
 */
function listDevices(store, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Devices.listDevices(axios, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * List summaries for devices that match criteria.
 * @param store
 * @param criteria
 * @param format
 */
function listDeviceSummaries(store, criteria) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Devices.listDeviceSummaries(axios, criteria);
    return loaderWrapper(store, api);
}
/**
 * List assignment history for a device.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
function listDeviceAssignmentHistory(store, token, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Devices.listDeviceAssignmentHistory(axios, token, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * Delete an existing device.
 * @param store
 * @param token
 */
function deleteDevice(store, token) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Devices.deleteDevice(axios, token);
    return loaderWrapper(store, api);
}

/**
 * Get currently effective instance configuration.
 * @param store
 */
function getInstanceConfiguration(store) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Instance.getInstanceConfiguration(axios);
    return loaderWrapper(store, api);
}
/**
 * Update the global instance configuration.
 * @param store
 * @param request
 */
function updateInstanceConfiguration(store, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Instance.updateInstanceConfiguration(axios, request);
    return loaderWrapper(store, api);
}
/**
 * Get instance topology information.
 * @param store
 */
function getInstanceMicroservices(store) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Instance.getInstanceMicroservices(axios);
    return loaderWrapper(store, api);
}
/**
 * Get tenant engine configuration information.
 * @param store
 * @param functionalArea
 * @param tenant
 */
function getTenantEngineConfiguration(store, functionalArea, tenant) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Instance.getTenantEngineConfiguration(axios, functionalArea, tenant);
    return loaderWrapper(store, api);
}
/**
 * Update tenant engine configuration information.
 * @param store
 * @param functionalArea
 * @param tenant
 * @param configuration
 */
function updateTenantEngineConfiguration(store, functionalArea, tenant, configuration) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Instance.updateTenantEngineConfiguration(axios, functionalArea, tenant, configuration);
    return loaderWrapper(store, api);
}

/**
 * Create a new schedule.
 * @param store
 * @param request
 */
function createSchedule(store, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Schedules.createSchedule(axios, request);
    return loaderWrapper(store, api);
}
/**
 * Get schedule by token.
 * @param store
 * @param token
 * @param format
 */
function getSchedule(store, token, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Schedules.getSchedule(axios, token, format);
    return loaderWrapper(store, api);
}
/**
 * Update an existing schedule.
 * @param store
 * @param token
 * @param request
 */
function updateSchedule(store, token, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Schedules.updateSchedule(axios, token, request);
    return loaderWrapper(store, api);
}
/**
 * Delete an existing schedule.
 * @param store
 * @param token
 */
function deleteSchedule(store, token) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Schedules.deleteSchedule(axios, token);
    return loaderWrapper(store, api);
}
/**
 * List schedules that match criteria.
 * @param store
 * @param criteria
 * @param format
 */
function listSchedules(store, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Schedules.listSchedules(axios, criteria, format);
    return loaderWrapper(store, api);
}

/**
 * List all script categories for a functional area.
 * @param store
 * @param identifier
 */
function listScriptCategories(store, identifier) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Scripting.listScriptCategories(axios, identifier);
    return loaderWrapper(store, api);
}
/**
 * List script templates for a functional area and in a given category.
 * @param store
 * @param identifier
 * @param category
 */
function listScriptTemplates(store, identifier, category) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Scripting.listScriptTemplates(axios, identifier, category);
    return loaderWrapper(store, api);
}
/**
 * List metadata for microservice tenant scripts.
 * @param store
 * @param identifier
 * @param tenantToken
 */
function listTenantScriptMetadata(store, identifier, tenantToken) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Scripting.listTenantScripts(axios, identifier, tenantToken);
    return loaderWrapper(store, api);
}
/**
 * List tenant scripts for functional area and belonging to category.
 * @param store
 * @param identifier
 * @param tenantToken
 * @param category
 */
function listTenantScriptsForCategory(store, identifier, tenantToken, category) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Scripting.listTenantScriptsForCategory(axios, identifier, tenantToken, category);
    return loaderWrapper(store, api);
}
/**
 * List scripts organized by category.
 * @param store
 * @param identifier
 * @param tenantToken
 */
function listTenantScriptsByCategory(store, identifier, tenantToken) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Scripting.listTenantScriptsByCategory(axios, identifier, tenantToken);
    return loaderWrapper(store, api);
}
/**
 * Get metadata associated with a microservice tenant script.
 * @param store
 * @param identifier
 * @param tenantToken
 * @param scriptId
 */
function getTenantScriptMetadata(store, identifier, tenantToken, scriptId) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Scripting.getTenantScript(axios, identifier, tenantToken, scriptId);
    return loaderWrapper(store, api);
}
/**
 * Create a new microservice tenant script.
 * @param store
 * @param identifier
 * @param tenantToken
 * @param request
 */
function createTenantScript(store, identifier, tenantToken, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Scripting.createTenantScript(axios, identifier, tenantToken, request);
    return loaderWrapper(store, api);
}
/**
 * Get content for a microservice tenant script.
 * @param store
 * @param identifier
 * @param tenantToken
 * @param scriptId
 * @param versionId
 */
function getTenantScriptContent(store, identifier, tenantToken, scriptId, versionId) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Scripting.getTenantScriptContent(axios, identifier, tenantToken, scriptId, versionId);
    return loaderWrapper(store, api);
}
/**
 * Update an existing microservice tenant script.
 * @param store
 * @param identifier
 * @param tenantToken
 * @param scriptId
 * @param versionId
 * @param request
 */
function updateTenantScript(store, identifier, tenantToken, scriptId, versionId, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Scripting.updateTenantScript(axios, identifier, tenantToken, scriptId, versionId, request);
    return loaderWrapper(store, api);
}
/**
 * Clone an existing microservice tenant script.
 * @param store
 * @param identifier
 * @param tenantToken
 * @param scriptId
 * @param versionId
 * @param request
 */
function cloneTenantScript(store, identifier, tenantToken, scriptId, versionId, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Scripting.cloneTenantScript(axios, identifier, tenantToken, scriptId, versionId, request);
    return loaderWrapper(store, api);
}
/**
 * Activate a microservice tenant script.
 * @param store
 * @param identifier
 * @param tenantToken
 * @param scriptId
 * @param versionId
 */
function activateTenantScript(store, identifier, tenantToken, scriptId, versionId) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Scripting.activateTenantScript(axios, identifier, tenantToken, scriptId, versionId);
    return loaderWrapper(store, api);
}

/**
 * Create a new system tenant.
 * @param store
 * @param request
 */
function createTenant(store, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Tenants.createTenant(axios, request);
    return loaderWrapper(store, api);
}
/**
 * Get system tenant by token.
 * @param store
 * @param token
 * @param format
 */
function getTenant(store, token, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Tenants.getTenant(axios, token, format);
    return loaderWrapper(store, api);
}
/**
 * Update an existing system tenant.
 * @param store
 * @param token
 * @param request
 */
function updateTenant(store, token, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Tenants.updateTenant(axios, token, request);
    return loaderWrapper(store, api);
}
/**
 * List system tenants that match the given criteria.
 * @param store
 * @param criteria
 * @param format
 */
function listTenants(store, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Tenants.listTenants(axios, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * Delete an existing system tenant.
 * @param store
 * @param token
 */
function deleteTenant(store, token) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Tenants.deleteTenant(axios, token);
    return loaderWrapper(store, api);
}
/**
 * List available tenant configuration templates.
 * @param store
 */
function listTenantConfigurationTemplates(store) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Tenants.listTenantConfigurationTemplates(axios);
    return loaderWrapper(store, api);
}
/**
 * List available dataset templates.
 * @param store
 */
function listTenantDatasetTemplates(store) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Tenants.listTenantDatasetTemplates(axios);
    return loaderWrapper(store, api);
}

/**
 * Create a new system user.
 * @param store
 * @param payload
 */
function createUser(store, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Users.createUser(axios, request);
    return loaderWrapper(store, api);
}
/**
 * Get an existing system user by username.
 * @param store
 * @param username
 * @param format
 */
function getUser(store, username, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Users.getUser(axios, username, format);
    return loaderWrapper(store, api);
}
/**
 * Update an existing system user.
 * @param store
 * @param username
 * @param request
 */
function updateUser(store, username, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Users.updateUser(axios, username, request);
    return loaderWrapper(store, api);
}
/**
 * Delete an existing system user.
 * @param store
 * @param username
 */
function deleteUser(store, username) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Users.deleteUser(axios, username);
    return loaderWrapper(store, api);
}
/**
 * List users that match the given criteria.
 * @param store
 * @param criteria
 * @param format
 */
function listUsers(store, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Users.listUsers(axios, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * List roles that match the given criteria.
 * @param store
 * @param criteria
 * @param format
 */
function listRoles(store, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Users.listRoles(axios, criteria, format);
    return loaderWrapper(store, api);
}

/**
 * Create a new zone.
 * @param store
 * @param request
 */
function createZone(store, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Zones.createZone(axios, request);
    return loaderWrapper(store, api);
}
/**
 * Get a zone by unique token.
 * @param store
 * @param token
 */
function getZone(store, token) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Zones.getZone(axios, token);
    return loaderWrapper(store, api);
}
/**
 * Update an existing zone.
 * @param store
 * @param token
 * @param request
 */
function updateZone(store, token, request) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Zones.updateZone(axios, token, request);
    return loaderWrapper(store, api);
}
/**
 * List zones that match the given criteria.
 * @param store
 * @param criteria
 * @param format
 */
function listZones(store, criteria, format) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Zones.listZones(axios, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * Delete an existing zone.
 * @param store
 * @param token
 */
function deleteZone(store, token) {
    var axios = createCoreApiCall(store);
    var api = sitewhereRestApi.API.Zones.deleteZone(axios, token);
    return loaderWrapper(store, api);
}

exports.activateTenantScript = activateTenantScript;
exports.arrayMove = arrayMove;
exports.arrayToMetadata = arrayToMetadata;
exports.cloneTenantScript = cloneTenantScript;
exports.createAdminWebSocketUrl = createAdminWebSocketUrl;
exports.createAlertForAssignment = createAlertForAssignment;
exports.createArea = createArea;
exports.createAreaType = createAreaType;
exports.createAsset = createAsset;
exports.createAssetType = createAssetType;
exports.createAuthApiCall = createAuthApiCall;
exports.createAuthApiUrl = createAuthApiUrl;
exports.createBatchCommandInvocation = createBatchCommandInvocation;
exports.createCommandInvocationForAssignment = createCommandInvocationForAssignment;
exports.createCoreApiCall = createCoreApiCall;
exports.createCoreApiUrl = createCoreApiUrl;
exports.createCustomer = createCustomer;
exports.createCustomerType = createCustomerType;
exports.createDevice = createDevice;
exports.createDeviceAssignment = createDeviceAssignment;
exports.createDeviceCommand = createDeviceCommand;
exports.createDeviceGroup = createDeviceGroup;
exports.createDeviceGroupElements = createDeviceGroupElements;
exports.createDeviceStatus = createDeviceStatus;
exports.createDeviceType = createDeviceType;
exports.createInvocationsByAssignmentCriteria = createInvocationsByAssignmentCriteria;
exports.createInvocationsByDeviceCriteria = createInvocationsByDeviceCriteria;
exports.createLocationForAssignment = createLocationForAssignment;
exports.createMeasurementsForAssignment = createMeasurementsForAssignment;
exports.createSchedule = createSchedule;
exports.createTenant = createTenant;
exports.createTenantScript = createTenantScript;
exports.createUser = createUser;
exports.createZone = createZone;
exports.deleteArea = deleteArea;
exports.deleteAreaType = deleteAreaType;
exports.deleteAsset = deleteAsset;
exports.deleteAssetType = deleteAssetType;
exports.deleteCustomer = deleteCustomer;
exports.deleteCustomerType = deleteCustomerType;
exports.deleteDevice = deleteDevice;
exports.deleteDeviceAssignment = deleteDeviceAssignment;
exports.deleteDeviceCommand = deleteDeviceCommand;
exports.deleteDeviceGroup = deleteDeviceGroup;
exports.deleteDeviceGroupElement = deleteDeviceGroupElement;
exports.deleteDeviceStatus = deleteDeviceStatus;
exports.deleteDeviceType = deleteDeviceType;
exports.deleteSchedule = deleteSchedule;
exports.deleteTenant = deleteTenant;
exports.deleteUser = deleteUser;
exports.deleteZone = deleteZone;
exports.ellipsis = ellipsis;
exports.formatDate = formatDate;
exports.formatIso8601 = formatIso8601;
exports.fourDecimalPlaces = fourDecimalPlaces;
exports.generateUniqueId = generateUniqueId;
exports.getArea = getArea;
exports.getAreaType = getAreaType;
exports.getAsset = getAsset;
exports.getAssetType = getAssetType;
exports.getBatchOperation = getBatchOperation;
exports.getCustomer = getCustomer;
exports.getCustomerType = getCustomerType;
exports.getDevice = getDevice;
exports.getDeviceAssignment = getDeviceAssignment;
exports.getDeviceCommand = getDeviceCommand;
exports.getDeviceGroup = getDeviceGroup;
exports.getDeviceStatus = getDeviceStatus;
exports.getDeviceType = getDeviceType;
exports.getInstanceConfiguration = getInstanceConfiguration;
exports.getInstanceMicroservices = getInstanceMicroservices;
exports.getJwt = getJwt;
exports.getSchedule = getSchedule;
exports.getTenant = getTenant;
exports.getTenantEngineConfiguration = getTenantEngineConfiguration;
exports.getTenantScriptContent = getTenantScriptContent;
exports.getTenantScriptMetadata = getTenantScriptMetadata;
exports.getUser = getUser;
exports.getZone = getZone;
exports.handleError = handleError;
exports.imageAuthGet = imageAuthGet;
exports.isAuthForAll = isAuthForAll;
exports.isAxiosResponse = isAxiosResponse;
exports.isBlank = isBlank;
exports.listAlertsForArea = listAlertsForArea;
exports.listAlertsForAssignment = listAlertsForAssignment;
exports.listAlertsForCustomer = listAlertsForCustomer;
exports.listAreaTypes = listAreaTypes;
exports.listAreas = listAreas;
exports.listAssetTypes = listAssetTypes;
exports.listAssets = listAssets;
exports.listAssignmentSummariesForArea = listAssignmentSummariesForArea;
exports.listAssignmentSummariesForCustomer = listAssignmentSummariesForCustomer;
exports.listAssignmentsForArea = listAssignmentsForArea;
exports.listAssignmentsForCustomer = listAssignmentsForCustomer;
exports.listBatchOperationElements = listBatchOperationElements;
exports.listBatchOperations = listBatchOperations;
exports.listCommandInvocationsForAssignment = listCommandInvocationsForAssignment;
exports.listCommandResponsesForAssignment = listCommandResponsesForAssignment;
exports.listCustomerTypes = listCustomerTypes;
exports.listCustomers = listCustomers;
exports.listDeviceAssignmentHistory = listDeviceAssignmentHistory;
exports.listDeviceAssignments = listDeviceAssignments;
exports.listDeviceCommands = listDeviceCommands;
exports.listDeviceCommandsByNamespace = listDeviceCommandsByNamespace;
exports.listDeviceGroupElements = listDeviceGroupElements;
exports.listDeviceGroups = listDeviceGroups;
exports.listDeviceStatuses = listDeviceStatuses;
exports.listDeviceSummaries = listDeviceSummaries;
exports.listDeviceTypes = listDeviceTypes;
exports.listDevices = listDevices;
exports.listLocationsForArea = listLocationsForArea;
exports.listLocationsForAssignment = listLocationsForAssignment;
exports.listLocationsForCustomer = listLocationsForCustomer;
exports.listMeasurementsForArea = listMeasurementsForArea;
exports.listMeasurementsForAssignment = listMeasurementsForAssignment;
exports.listMeasurementsForAssignmentAsChartSeries = listMeasurementsForAssignmentAsChartSeries;
exports.listMeasurementsForCustomer = listMeasurementsForCustomer;
exports.listRoles = listRoles;
exports.listSchedules = listSchedules;
exports.listScriptCategories = listScriptCategories;
exports.listScriptTemplates = listScriptTemplates;
exports.listTenantConfigurationTemplates = listTenantConfigurationTemplates;
exports.listTenantDatasetTemplates = listTenantDatasetTemplates;
exports.listTenantScriptMetadata = listTenantScriptMetadata;
exports.listTenantScriptsByCategory = listTenantScriptsByCategory;
exports.listTenantScriptsForCategory = listTenantScriptsForCategory;
exports.listTenants = listTenants;
exports.listUsers = listUsers;
exports.listZones = listZones;
exports.loaderWrapper = loaderWrapper;
exports.metadataToArray = metadataToArray;
exports.missingAssignment = missingAssignment;
exports.pagingForAllResults = pagingForAllResults;
exports.parseIso8601 = parseIso8601;
exports.releaseAssignment = releaseAssignment;
exports.routeTo = routeTo;
exports.routeToDevice = routeToDevice;
exports.scheduleCommandInvocation = scheduleCommandInvocation;
exports.searchDeviceAssignmentSummaries = searchDeviceAssignmentSummaries;
exports.searchDeviceAssignments = searchDeviceAssignments;
exports.searchDeviceStates = searchDeviceStates;
exports.showError = showError;
exports.showMessage = showMessage;
exports.updateArea = updateArea;
exports.updateAreaType = updateAreaType;
exports.updateAsset = updateAsset;
exports.updateAssetType = updateAssetType;
exports.updateCustomer = updateCustomer;
exports.updateCustomerType = updateCustomerType;
exports.updateDevice = updateDevice;
exports.updateDeviceCommand = updateDeviceCommand;
exports.updateDeviceGroup = updateDeviceGroup;
exports.updateDeviceStatus = updateDeviceStatus;
exports.updateDeviceType = updateDeviceType;
exports.updateInstanceConfiguration = updateInstanceConfiguration;
exports.updateSchedule = updateSchedule;
exports.updateTenant = updateTenant;
exports.updateTenantEngineConfiguration = updateTenantEngineConfiguration;
exports.updateTenantScript = updateTenantScript;
exports.updateUser = updateUser;
exports.updateZone = updateZone;
