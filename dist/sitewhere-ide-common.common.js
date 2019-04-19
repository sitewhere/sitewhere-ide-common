/**
  * SiteWhere IDE Common Library v0.0.11
  * (c) 2019 SiteWhere LLC
  * @license CPAL-1.0
  */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vue = _interopDefault(require('vue'));
var moment = _interopDefault(require('moment'));
var vuePropertyDecorator = require('vue-property-decorator');

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * Base class for components that display lists based on
 * SiteWhere REST services.
 */
var ListComponent = /** @class */ (function (_super) {
    __extends(ListComponent, _super);
    function ListComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.results = null;
        _this.paging = null;
        _this.matches = [];
        _this.loaded = false;
        return _this;
    }
    /** Update paging values and run query */
    ListComponent.prototype.onPagingUpdated = function (paging) {
        this.paging = paging;
        this.refresh();
    };
    /** Build search criteria for list */
    ListComponent.prototype.buildSearchCriteria = function () {
        throw new Error("Implement buildSearchCriteria()");
    };
    /** Build response format for list */
    ListComponent.prototype.buildResponseFormat = function () {
        throw new Error("Implement buildResponseFormat()");
    };
    /** Return promise for performing search */
    ListComponent.prototype.performSearch = function (criteria, format) {
        throw new Error("Implement performSearch()");
    };
    // Refresh list contents.
    ListComponent.prototype.refresh = function () {
        return __awaiter(this, void 0, void 0, function () {
            var criteria, format, promise, response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        criteria = this.buildSearchCriteria();
                        format = this.buildResponseFormat();
                        if (this.paging) {
                            criteria.pageNumber = this.paging.pageNumber;
                            criteria.pageSize = this.paging.pageSize;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.loaded = false;
                        promise = this.performSearch(criteria, format);
                        return [4 /*yield*/, promise];
                    case 2:
                        response = _a.sent();
                        this.results = response.data;
                        this.matches = response.data.results;
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        handleError(err_1);
                        return [3 /*break*/, 4];
                    case 4:
                        this.loaded = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    ListComponent = __decorate([
        vuePropertyDecorator.Component
    ], ListComponent);
    return ListComponent;
}(Vue));
/**
 * Base class for components that display data for a single record
 * based on SiteWhere REST services.
 */
var DetailComponent = /** @class */ (function (_super) {
    __extends(DetailComponent, _super);
    function DetailComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.token = null;
        _this.record = null;
        _this.loaded = false;
        return _this;
    }
    // Get parameter for route token.
    DetailComponent.prototype.getTokenParameter = function () {
        return "token";
    };
    // Called on initial create.
    DetailComponent.prototype.created = function () {
        this.display(this.$route.params[this.getTokenParameter()]);
    };
    // Called when component is reused.
    DetailComponent.prototype.beforeRouteUpdate = function (to, from, next) {
        console.log("Route updated", to);
        this.display(to.params.token);
        next();
    };
    // Display record with the given token.
    DetailComponent.prototype.display = function (token) {
        this.token = token;
        this.refresh();
    };
    /** Return promise for loading record */
    DetailComponent.prototype.loadRecord = function (token) {
        throw new Error("Implement loadRecord()");
    };
    // Refresh list contents.
    DetailComponent.prototype.refresh = function () {
        return __awaiter(this, void 0, void 0, function () {
            var promise, response, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.loaded = false;
                        promise = this.loadRecord(this.token);
                        return [4 /*yield*/, promise];
                    case 1:
                        response = _a.sent();
                        this.record = response.data;
                        this.afterRecordLoaded(this.record);
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        handleError(err_2);
                        return [3 /*break*/, 3];
                    case 3:
                        this.loaded = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    /** Called after record is loaded */
    DetailComponent.prototype.afterRecordLoaded = function (record) {
        console.log("Loaded record", record);
    };
    DetailComponent = __decorate([
        vuePropertyDecorator.Component
    ], DetailComponent);
    return DetailComponent;
}(Vue));
/**
 * Base class for components that display header data for a
 * SiteWhere entity.
 */
var HeaderComponent = /** @class */ (function (_super) {
    __extends(HeaderComponent, _super);
    function HeaderComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Handle date formatting in a standard way.
    HeaderComponent.prototype.formatDate = function (date) {
        return formatDate(date);
    };
    __decorate([
        vuePropertyDecorator.Prop(),
        __metadata("design:type", Object)
    ], HeaderComponent.prototype, "record", void 0);
    HeaderComponent = __decorate([
        vuePropertyDecorator.Component
    ], HeaderComponent);
    return HeaderComponent;
}(Vue));
/**
 * Base class for dialog components.
 */
var DialogComponent = /** @class */ (function (_super) {
    __extends(DialogComponent, _super);
    function DialogComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dialogVisible = false;
        _this.error = null;
        return _this;
    }
    /** Reset dialog content */
    DialogComponent.prototype.reset = function () {
        throw new Error("Reset not implemented in dialog.");
    };
    /** Load dialog from model */
    DialogComponent.prototype.load = function (model) {
        throw new Error("Load not implemented in dialog.");
    };
    /** Called to open the dialog */
    DialogComponent.prototype.openDialog = function () {
        this.dialogVisible = true;
    };
    /** Called to open the dialog */
    DialogComponent.prototype.closeDialog = function () {
        this.dialogVisible = false;
    };
    /** Called to show an error message */
    DialogComponent.prototype.showError = function (error) {
        this.error = error;
    };
    /** Action invoked when create is clicked */
    DialogComponent.prototype.onCreateClicked = function (e) { };
    /** Action invoked when cancel is clicked */
    DialogComponent.prototype.onCancelClicked = function (e) {
        this.closeDialog();
    };
    __decorate([
        vuePropertyDecorator.Prop(),
        __metadata("design:type", String)
    ], DialogComponent.prototype, "title", void 0);
    __decorate([
        vuePropertyDecorator.Prop(),
        __metadata("design:type", Number)
    ], DialogComponent.prototype, "width", void 0);
    __decorate([
        vuePropertyDecorator.Prop(),
        __metadata("design:type", String)
    ], DialogComponent.prototype, "createLabel", void 0);
    __decorate([
        vuePropertyDecorator.Prop(),
        __metadata("design:type", String)
    ], DialogComponent.prototype, "cancelLabel", void 0);
    __decorate([
        vuePropertyDecorator.Prop({ default: true }),
        __metadata("design:type", Boolean)
    ], DialogComponent.prototype, "loaded", void 0);
    DialogComponent = __decorate([
        vuePropertyDecorator.Component
    ], DialogComponent);
    return DialogComponent;
}(Vue));
/**
 * Base class for create dialogs.
 */
var CreateDialogComponent = /** @class */ (function (_super) {
    __extends(CreateDialogComponent, _super);
    function CreateDialogComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /** Get wrapped dialog */
    CreateDialogComponent.prototype.getDialog = function () {
        throw new Error("Create dialog must implement getDialog().");
    };
    /** Open wrapped dialog */
    CreateDialogComponent.prototype.open = function () {
        this.getDialog().reset();
        this.getDialog().openDialog();
    };
    /** Implemented in subclasses to save payload */
    CreateDialogComponent.prototype.save = function (payload) {
        throw new Error("Create dialog must implement save().");
    };
    /** Implemented in subclasses for after-save */
    CreateDialogComponent.prototype.afterSave = function (payload) { };
    /** Handle payload commit */
    CreateDialogComponent.prototype.commit = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var response, created, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.save(payload)];
                    case 1:
                        response = _a.sent();
                        created = response.data;
                        this.afterSave(created);
                        this.$emit("created", created);
                        this.getDialog().closeDialog();
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        handleError(err_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return CreateDialogComponent;
}(Vue));
/**
 * Base class for edit dialogs.
 */
var EditDialogComponent = /** @class */ (function (_super) {
    __extends(EditDialogComponent, _super);
    function EditDialogComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.record = null;
        _this.loaded = false;
        return _this;
    }
    /** Get wrapped dialog */
    EditDialogComponent.prototype.getDialog = function () {
        throw new Error("Edit dialog must implement getDialog().");
    };
    /**
     * Prepare load for the given identifier.
     * @param identifier
     */
    EditDialogComponent.prototype.prepareLoad = function (identifier) {
        throw new Error("Edit dialog must implement load().");
    };
    /**
     * Load record for identifer and open dialog.
     * @param identifier
     */
    EditDialogComponent.prototype.open = function (identifier) {
        return __awaiter(this, void 0, void 0, function () {
            var response, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!identifier) {
                            throw new Error("Identifier must be passed for edit.");
                        }
                        this.getDialog().openDialog();
                        this.getDialog().reset();
                        this.loaded = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.prepareLoad(identifier)];
                    case 2:
                        response = _a.sent();
                        this.record = response.data;
                        this.getDialog().load(this.record);
                        return [3 /*break*/, 4];
                    case 3:
                        err_4 = _a.sent();
                        handleError(err_4);
                        return [3 /*break*/, 4];
                    case 4:
                        this.loaded = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    /** Implemented in subclasses to save payload */
    EditDialogComponent.prototype.prepareSave = function (original, updated) {
        throw new Error("Edit dialog must implement save().");
    };
    /** Handle payload commit */
    EditDialogComponent.prototype.save = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var response, updated, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.record) {
                            throw new Error("Unable to update. Record is null.");
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.prepareSave(this.record, payload)];
                    case 2:
                        response = _a.sent();
                        updated = response.data;
                        this.afterSave(updated);
                        this.$emit("updated", updated);
                        this.getDialog().closeDialog();
                        return [3 /*break*/, 4];
                    case 3:
                        err_5 = _a.sent();
                        handleError(err_5);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /** Implemented in subclasses for after-save */
    EditDialogComponent.prototype.afterSave = function (payload) { };
    return EditDialogComponent;
}(Vue));
/**
 * Base class for delete dialog components.
 */
var DeleteDialogComponent = /** @class */ (function (_super) {
    __extends(DeleteDialogComponent, _super);
    function DeleteDialogComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.record = null;
        _this.visible = false;
        _this.error = null;
        return _this;
    }
    /**
     * Load object to be deleted.
     * @param identifier
     */
    DeleteDialogComponent.prototype.prepareLoad = function (identifier) {
        throw new Error("Load not implemented in dialog.");
    };
    /** Called after record is loaded */
    DeleteDialogComponent.prototype.afterLoad = function (record) { };
    /**
     * Load data, then open dialog.
     * @param identifier
     */
    DeleteDialogComponent.prototype.open = function (identifier) {
        return __awaiter(this, void 0, void 0, function () {
            var response, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.prepareLoad(identifier)];
                    case 1:
                        response = _a.sent();
                        this.record = response.data;
                        this.visible = true;
                        this.afterLoad(this.record);
                        return [3 /*break*/, 3];
                    case 2:
                        err_6 = _a.sent();
                        handleError(err_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /** Return method to delete record */
    DeleteDialogComponent.prototype.prepareDelete = function (record) {
        throw new Error("Delete not implemented in dialog.");
    };
    /** Action invoked when delete is clicked */
    DeleteDialogComponent.prototype.delete = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.record) {
                            throw new Error("Unable to delete. Record is null.");
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.prepareDelete(this.record)];
                    case 2:
                        response = _a.sent();
                        this.record = response.data;
                        this.$emit("deleted", this.record);
                        this.closeDialog();
                        return [3 /*break*/, 4];
                    case 3:
                        err_7 = _a.sent();
                        handleError(err_7);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /** Action invoked when cancel is clicked */
    DeleteDialogComponent.prototype.cancel = function () {
        this.closeDialog();
    };
    /** Called to open the dialog */
    DeleteDialogComponent.prototype.closeDialog = function () {
        this.visible = false;
    };
    /** Called to show an error message */
    DeleteDialogComponent.prototype.showError = function (error) {
        this.error = error;
    };
    __decorate([
        vuePropertyDecorator.Prop(),
        __metadata("design:type", String)
    ], DeleteDialogComponent.prototype, "title", void 0);
    __decorate([
        vuePropertyDecorator.Prop(),
        __metadata("design:type", Number)
    ], DeleteDialogComponent.prototype, "width", void 0);
    DeleteDialogComponent = __decorate([
        vuePropertyDecorator.Component
    ], DeleteDialogComponent);
    return DeleteDialogComponent;
}(Vue));
/**
 * Base class for dialog sections.
 */
var DialogSection = /** @class */ (function (_super) {
    __extends(DialogSection, _super);
    function DialogSection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /** Called on component create */
    DialogSection.prototype.created = function () {
        this.reset();
    };
    /** Reset section content */
    DialogSection.prototype.reset = function () {
        throw new Error("Reset not implemented in dialog section.");
    };
    /** Validate fields in the dialog section */
    DialogSection.prototype.validate = function () {
        return true;
    };
    /** Load form data from an object */
    DialogSection.prototype.load = function (input) { };
    /** Save form data to an object */
    DialogSection.prototype.save = function () {
        return {};
    };
    DialogSection = __decorate([
        vuePropertyDecorator.Component
    ], DialogSection);
    return DialogSection;
}(Vue));
/**
 * Common error handler.
 * @param err
 */
function handleError(err) {
    console.log(err);
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

exports.CreateDialogComponent = CreateDialogComponent;
exports.DeleteDialogComponent = DeleteDialogComponent;
exports.DetailComponent = DetailComponent;
exports.DialogComponent = DialogComponent;
exports.DialogSection = DialogSection;
exports.EditDialogComponent = EditDialogComponent;
exports.HeaderComponent = HeaderComponent;
exports.ListComponent = ListComponent;
exports.formatDate = formatDate;
exports.handleError = handleError;
