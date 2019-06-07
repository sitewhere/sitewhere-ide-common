/**
  * SiteWhere IDE Common Library v0.0.22
  * (c) 2019 SiteWhere LLC
  * @license CPAL-1.0
  */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue'), require('moment')) :
	typeof define === 'function' && define.amd ? define(['exports', 'vue', 'moment'], factory) :
	(global = global || self, factory(global.SiteWhereIdeCommon = {}, global.Vue, global.moment));
}(this, function (exports, Vue, moment) { 'use strict';

	Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;
	moment = moment && moment.hasOwnProperty('default') ? moment['default'] : moment;

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var vueClassComponent_common = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, '__esModule', { value: true });

	function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

	var Vue$1 = _interopDefault(Vue);

	// The rational behind the verbose Reflect-feature check below is the fact that there are polyfills
	// which add an implementation for Reflect.defineMetadata but not for Reflect.getOwnMetadataKeys.
	// Without this check consumers will encounter hard to track down runtime errors.
	var reflectionIsSupported = typeof Reflect !== 'undefined' && Reflect.defineMetadata && Reflect.getOwnMetadataKeys;
	function copyReflectionMetadata(to, from) {
	    forwardMetadata(to, from);
	    Object.getOwnPropertyNames(from.prototype).forEach(function (key) {
	        forwardMetadata(to.prototype, from.prototype, key);
	    });
	    Object.getOwnPropertyNames(from).forEach(function (key) {
	        forwardMetadata(to, from, key);
	    });
	}
	function forwardMetadata(to, from, propertyKey) {
	    var metaKeys = propertyKey
	        ? Reflect.getOwnMetadataKeys(from, propertyKey)
	        : Reflect.getOwnMetadataKeys(from);
	    metaKeys.forEach(function (metaKey) {
	        var metadata = propertyKey
	            ? Reflect.getOwnMetadata(metaKey, from, propertyKey)
	            : Reflect.getOwnMetadata(metaKey, from);
	        if (propertyKey) {
	            Reflect.defineMetadata(metaKey, metadata, to, propertyKey);
	        }
	        else {
	            Reflect.defineMetadata(metaKey, metadata, to);
	        }
	    });
	}

	var fakeArray = { __proto__: [] };
	var hasProto = fakeArray instanceof Array;
	function createDecorator(factory) {
	    return function (target, key, index) {
	        var Ctor = typeof target === 'function'
	            ? target
	            : target.constructor;
	        if (!Ctor.__decorators__) {
	            Ctor.__decorators__ = [];
	        }
	        if (typeof index !== 'number') {
	            index = undefined;
	        }
	        Ctor.__decorators__.push(function (options) { return factory(options, key, index); });
	    };
	}
	function mixins() {
	    var Ctors = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        Ctors[_i] = arguments[_i];
	    }
	    return Vue$1.extend({ mixins: Ctors });
	}
	function isPrimitive(value) {
	    var type = typeof value;
	    return value == null || (type !== 'object' && type !== 'function');
	}
	function warn(message) {
	    if (typeof console !== 'undefined') {
	        console.warn('[vue-class-component] ' + message);
	    }
	}

	function collectDataFromConstructor(vm, Component) {
	    // override _init to prevent to init as Vue instance
	    var originalInit = Component.prototype._init;
	    Component.prototype._init = function () {
	        var _this = this;
	        // proxy to actual vm
	        var keys = Object.getOwnPropertyNames(vm);
	        // 2.2.0 compat (props are no longer exposed as self properties)
	        if (vm.$options.props) {
	            for (var key in vm.$options.props) {
	                if (!vm.hasOwnProperty(key)) {
	                    keys.push(key);
	                }
	            }
	        }
	        keys.forEach(function (key) {
	            if (key.charAt(0) !== '_') {
	                Object.defineProperty(_this, key, {
	                    get: function () { return vm[key]; },
	                    set: function (value) { vm[key] = value; },
	                    configurable: true
	                });
	            }
	        });
	    };
	    // should be acquired class property values
	    var data = new Component();
	    // restore original _init to avoid memory leak (#209)
	    Component.prototype._init = originalInit;
	    // create plain data object
	    var plainData = {};
	    Object.keys(data).forEach(function (key) {
	        if (data[key] !== undefined) {
	            plainData[key] = data[key];
	        }
	    });
	    {
	        if (!(Component.prototype instanceof Vue$1) && Object.keys(plainData).length > 0) {
	            warn('Component class must inherit Vue or its descendant class ' +
	                'when class property is used.');
	        }
	    }
	    return plainData;
	}

	var $internalHooks = [
	    'data',
	    'beforeCreate',
	    'created',
	    'beforeMount',
	    'mounted',
	    'beforeDestroy',
	    'destroyed',
	    'beforeUpdate',
	    'updated',
	    'activated',
	    'deactivated',
	    'render',
	    'errorCaptured',
	    'serverPrefetch' // 2.6
	];
	function componentFactory(Component, options) {
	    if (options === void 0) { options = {}; }
	    options.name = options.name || Component._componentTag || Component.name;
	    // prototype props.
	    var proto = Component.prototype;
	    Object.getOwnPropertyNames(proto).forEach(function (key) {
	        if (key === 'constructor') {
	            return;
	        }
	        // hooks
	        if ($internalHooks.indexOf(key) > -1) {
	            options[key] = proto[key];
	            return;
	        }
	        var descriptor = Object.getOwnPropertyDescriptor(proto, key);
	        if (descriptor.value !== void 0) {
	            // methods
	            if (typeof descriptor.value === 'function') {
	                (options.methods || (options.methods = {}))[key] = descriptor.value;
	            }
	            else {
	                // typescript decorated data
	                (options.mixins || (options.mixins = [])).push({
	                    data: function () {
	                        var _a;
	                        return _a = {}, _a[key] = descriptor.value, _a;
	                    }
	                });
	            }
	        }
	        else if (descriptor.get || descriptor.set) {
	            // computed properties
	            (options.computed || (options.computed = {}))[key] = {
	                get: descriptor.get,
	                set: descriptor.set
	            };
	        }
	    });
	    (options.mixins || (options.mixins = [])).push({
	        data: function () {
	            return collectDataFromConstructor(this, Component);
	        }
	    });
	    // decorate options
	    var decorators = Component.__decorators__;
	    if (decorators) {
	        decorators.forEach(function (fn) { return fn(options); });
	        delete Component.__decorators__;
	    }
	    // find super
	    var superProto = Object.getPrototypeOf(Component.prototype);
	    var Super = superProto instanceof Vue$1
	        ? superProto.constructor
	        : Vue$1;
	    var Extended = Super.extend(options);
	    forwardStaticMembers(Extended, Component, Super);
	    if (reflectionIsSupported) {
	        copyReflectionMetadata(Extended, Component);
	    }
	    return Extended;
	}
	var reservedPropertyNames = [
	    // Unique id
	    'cid',
	    // Super Vue constructor
	    'super',
	    // Component options that will be used by the component
	    'options',
	    'superOptions',
	    'extendOptions',
	    'sealedOptions',
	    // Private assets
	    'component',
	    'directive',
	    'filter'
	];
	var shouldIgnore = {
	    prototype: true,
	    arguments: true,
	    callee: true,
	    caller: true
	};
	function forwardStaticMembers(Extended, Original, Super) {
	    // We have to use getOwnPropertyNames since Babel registers methods as non-enumerable
	    Object.getOwnPropertyNames(Original).forEach(function (key) {
	        // Skip the properties that should not be overwritten
	        if (shouldIgnore[key]) {
	            return;
	        }
	        // Some browsers does not allow reconfigure built-in properties
	        var extendedDescriptor = Object.getOwnPropertyDescriptor(Extended, key);
	        if (extendedDescriptor && !extendedDescriptor.configurable) {
	            return;
	        }
	        var descriptor = Object.getOwnPropertyDescriptor(Original, key);
	        // If the user agent does not support `__proto__` or its family (IE <= 10),
	        // the sub class properties may be inherited properties from the super class in TypeScript.
	        // We need to exclude such properties to prevent to overwrite
	        // the component options object which stored on the extended constructor (See #192).
	        // If the value is a referenced value (object or function),
	        // we can check equality of them and exclude it if they have the same reference.
	        // If it is a primitive value, it will be forwarded for safety.
	        if (!hasProto) {
	            // Only `cid` is explicitly exluded from property forwarding
	            // because we cannot detect whether it is a inherited property or not
	            // on the no `__proto__` environment even though the property is reserved.
	            if (key === 'cid') {
	                return;
	            }
	            var superDescriptor = Object.getOwnPropertyDescriptor(Super, key);
	            if (!isPrimitive(descriptor.value) &&
	                superDescriptor &&
	                superDescriptor.value === descriptor.value) {
	                return;
	            }
	        }
	        // Warn if the users manually declare reserved properties
	        if (reservedPropertyNames.indexOf(key) >= 0) {
	            warn("Static property name '" + key + "' declared on class '" + Original.name + "' " +
	                'conflicts with reserved property name of Vue internal. ' +
	                'It may cause unexpected behavior of the component. Consider renaming the property.');
	        }
	        Object.defineProperty(Extended, key, descriptor);
	    });
	}

	function Component(options) {
	    if (typeof options === 'function') {
	        return componentFactory(options);
	    }
	    return function (Component) {
	        return componentFactory(Component, options);
	    };
	}
	Component.registerHooks = function registerHooks(keys) {
	    $internalHooks.push.apply($internalHooks, keys);
	};

	exports.default = Component;
	exports.createDecorator = createDecorator;
	exports.mixins = mixins;
	});

	var Component = unwrapExports(vueClassComponent_common);
	var vueClassComponent_common_1 = vueClassComponent_common.createDecorator;
	var vueClassComponent_common_2 = vueClassComponent_common.mixins;

	/** vue-property-decorator verson 8.1.0 MIT LICENSE copyright 2018 kaorun343 */
	/**
	 * decorator of an inject
	 * @param from key
	 * @return PropertyDecorator
	 */
	function Inject(options) {
	    return vueClassComponent_common_1(function (componentOptions, key) {
	        if (typeof componentOptions.inject === 'undefined') {
	            componentOptions.inject = {};
	        }
	        if (!Array.isArray(componentOptions.inject)) {
	            componentOptions.inject[key] = options || key;
	        }
	    });
	}
	/**
	 * decorator of a provide
	 * @param key key
	 * @return PropertyDecorator | void
	 */
	function Provide(key) {
	    return vueClassComponent_common_1(function (componentOptions, k) {
	        var provide = componentOptions.provide;
	        if (typeof provide !== 'function' || !provide.managed) {
	            var original_1 = componentOptions.provide;
	            provide = componentOptions.provide = function () {
	                var rv = Object.create((typeof original_1 === 'function' ? original_1.call(this) : original_1) || null);
	                for (var i in provide.managed)
	                    rv[provide.managed[i]] = this[i];
	                return rv;
	            };
	            provide.managed = {};
	        }
	        provide.managed[k] = key || k;
	    });
	}
	/** @see {@link https://github.com/vuejs/vue-class-component/blob/master/src/reflect.ts} */
	var reflectMetadataIsSupported = typeof Reflect !== 'undefined' && typeof Reflect.getMetadata !== 'undefined';
	function applyMetadata(options, target, key) {
	    if (reflectMetadataIsSupported) {
	        if (!Array.isArray(options) && typeof options !== 'function' && typeof options.type === 'undefined') {
	            options.type = Reflect.getMetadata('design:type', target, key);
	        }
	    }
	}
	/**
	 * decorator of model
	 * @param  event event name
	 * @param options options
	 * @return PropertyDecorator
	 */
	function Model(event, options) {
	    if (options === void 0) { options = {}; }
	    return function (target, key) {
	        applyMetadata(options, target, key);
	        vueClassComponent_common_1(function (componentOptions, k) {
	            (componentOptions.props || (componentOptions.props = {}))[k] = options;
	            componentOptions.model = { prop: k, event: event || k };
	        })(target, key);
	    };
	}
	/**
	 * decorator of a prop
	 * @param  options the options for the prop
	 * @return PropertyDecorator | void
	 */
	function Prop(options) {
	    if (options === void 0) { options = {}; }
	    return function (target, key) {
	        applyMetadata(options, target, key);
	        vueClassComponent_common_1(function (componentOptions, k) {
	            (componentOptions.props || (componentOptions.props = {}))[k] = options;
	        })(target, key);
	    };
	}
	/**
	 * decorator of a watch function
	 * @param  path the path or the expression to observe
	 * @param  WatchOption
	 * @return MethodDecorator
	 */
	function Watch(path, options) {
	    if (options === void 0) { options = {}; }
	    var _a = options.deep, deep = _a === void 0 ? false : _a, _b = options.immediate, immediate = _b === void 0 ? false : _b;
	    return vueClassComponent_common_1(function (componentOptions, handler) {
	        if (typeof componentOptions.watch !== 'object') {
	            componentOptions.watch = Object.create(null);
	        }
	        var watch = componentOptions.watch;
	        if (typeof watch[path] === 'object' && !Array.isArray(watch[path])) {
	            watch[path] = [watch[path]];
	        }
	        else if (typeof watch[path] === 'undefined') {
	            watch[path] = [];
	        }
	        watch[path].push({ handler: handler, deep: deep, immediate: immediate });
	    });
	}
	// Code copied from Vue/src/shared/util.js
	var hyphenateRE = /\B([A-Z])/g;
	var hyphenate = function (str) { return str.replace(hyphenateRE, '-$1').toLowerCase(); };
	/**
	 * decorator of an event-emitter function
	 * @param  event The name of the event
	 * @return MethodDecorator
	 */
	function Emit(event) {
	    return function (_target, key, descriptor) {
	        key = hyphenate(key);
	        var original = descriptor.value;
	        descriptor.value = function emitter() {
	            var _this = this;
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            var emit = function (returnValue) {
	                if (returnValue !== undefined)
	                    args.unshift(returnValue);
	                _this.$emit.apply(_this, [event || key].concat(args));
	            };
	            var returnValue = original.apply(this, args);
	            if (isPromise(returnValue)) {
	                returnValue.then(function (returnValue) {
	                    emit(returnValue);
	                });
	            }
	            else {
	                emit(returnValue);
	            }
	        };
	    };
	}
	function isPromise(obj) {
	    return obj instanceof Promise || (obj && typeof obj.then === 'function');
	}

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
	        Component
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
	        Component
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
	        Prop(),
	        __metadata("design:type", Object)
	    ], HeaderComponent.prototype, "record", void 0);
	    HeaderComponent = __decorate([
	        Component
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
	        Prop(),
	        __metadata("design:type", String)
	    ], DialogComponent.prototype, "title", void 0);
	    __decorate([
	        Prop(),
	        __metadata("design:type", Number)
	    ], DialogComponent.prototype, "width", void 0);
	    __decorate([
	        Prop(),
	        __metadata("design:type", String)
	    ], DialogComponent.prototype, "createLabel", void 0);
	    __decorate([
	        Prop(),
	        __metadata("design:type", String)
	    ], DialogComponent.prototype, "cancelLabel", void 0);
	    __decorate([
	        Prop({ default: true }),
	        __metadata("design:type", Boolean)
	    ], DialogComponent.prototype, "loaded", void 0);
	    DialogComponent = __decorate([
	        Component
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
	    /** Type guard to differentiate between responses */
	    CreateDialogComponent.prototype.isAxiosResponse = function (response) {
	        return response.data !== undefined;
	    };
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
	                        created = this.isAxiosResponse(response)
	                            ? response.data
	                            : response;
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
	    /** Type guard to differentiate between responses */
	    EditDialogComponent.prototype.isAxiosResponse = function (response) {
	        return response.data !== undefined;
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
	                        this.record = this.isAxiosResponse(response) ? response.data : response;
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
	                        updated = this.isAxiosResponse(response)
	                            ? response.data
	                            : response;
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
	    /** Type guard to differentiate between responses */
	    DeleteDialogComponent.prototype.isAxiosResponse = function (response) {
	        return response.data !== undefined;
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
	                        this.record = this.isAxiosResponse(response) ? response.data : response;
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
	                        this.record = this.isAxiosResponse(response) ? response.data : response;
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
	        Prop(),
	        __metadata("design:type", String)
	    ], DeleteDialogComponent.prototype, "title", void 0);
	    __decorate([
	        Prop(),
	        __metadata("design:type", Number)
	    ], DeleteDialogComponent.prototype, "width", void 0);
	    DeleteDialogComponent = __decorate([
	        Component
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
	        Component
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

	exports.Vue = Vue;
	exports.Component = Component;
	exports.CreateDialogComponent = CreateDialogComponent;
	exports.DeleteDialogComponent = DeleteDialogComponent;
	exports.DetailComponent = DetailComponent;
	exports.DialogComponent = DialogComponent;
	exports.DialogSection = DialogSection;
	exports.EditDialogComponent = EditDialogComponent;
	exports.Emit = Emit;
	exports.HeaderComponent = HeaderComponent;
	exports.Inject = Inject;
	exports.ListComponent = ListComponent;
	exports.Mixins = vueClassComponent_common_2;
	exports.Model = Model;
	exports.Prop = Prop;
	exports.Provide = Provide;
	exports.Watch = Watch;
	exports.formatDate = formatDate;
	exports.handleError = handleError;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
