/**
  * SiteWhere IDE Common Library v3.0.0-alpha.1
  * (c) 2020 SiteWhere LLC
  * @license CPAL-1.0
  */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vue = _interopDefault(require('vue'));
var moment = _interopDefault(require('moment'));
var SiteWhere = require('sitewhere-rest-api');

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
  * vue-class-component v7.2.3
  * (c) 2015-present Evan You
  * @license MIT
  */

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

// The rational behind the verbose Reflect-feature check below is the fact that there are polyfills
// which add an implementation for Reflect.defineMetadata but not for Reflect.getOwnMetadataKeys.
// Without this check consumers will encounter hard to track down runtime errors.
function reflectionIsSupported() {
  return typeof Reflect !== 'undefined' && Reflect.defineMetadata && Reflect.getOwnMetadataKeys;
}
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
  var metaKeys = propertyKey ? Reflect.getOwnMetadataKeys(from, propertyKey) : Reflect.getOwnMetadataKeys(from);
  metaKeys.forEach(function (metaKey) {
    var metadata = propertyKey ? Reflect.getOwnMetadata(metaKey, from, propertyKey) : Reflect.getOwnMetadata(metaKey, from);

    if (propertyKey) {
      Reflect.defineMetadata(metaKey, metadata, to, propertyKey);
    } else {
      Reflect.defineMetadata(metaKey, metadata, to);
    }
  });
}

var fakeArray = {
  __proto__: []
};
var hasProto = fakeArray instanceof Array;
function createDecorator(factory) {
  return function (target, key, index) {
    var Ctor = typeof target === 'function' ? target : target.constructor;

    if (!Ctor.__decorators__) {
      Ctor.__decorators__ = [];
    }

    if (typeof index !== 'number') {
      index = undefined;
    }

    Ctor.__decorators__.push(function (options) {
      return factory(options, key, index);
    });
  };
}
function mixins() {
  for (var _len = arguments.length, Ctors = new Array(_len), _key = 0; _key < _len; _key++) {
    Ctors[_key] = arguments[_key];
  }

  return Vue.extend({
    mixins: Ctors
  });
}
function isPrimitive(value) {
  var type = _typeof(value);

  return value == null || type !== 'object' && type !== 'function';
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
    var keys = Object.getOwnPropertyNames(vm); // 2.2.0 compat (props are no longer exposed as self properties)

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
          get: function get() {
            return vm[key];
          },
          set: function set(value) {
            vm[key] = value;
          },
          configurable: true
        });
      }
    });
  }; // should be acquired class property values


  var data = new Component(); // restore original _init to avoid memory leak (#209)

  Component.prototype._init = originalInit; // create plain data object

  var plainData = {};
  Object.keys(data).forEach(function (key) {
    if (data[key] !== undefined) {
      plainData[key] = data[key];
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    if (!(Component.prototype instanceof Vue) && Object.keys(plainData).length > 0) {
      warn('Component class must inherit Vue or its descendant class ' + 'when class property is used.');
    }
  }

  return plainData;
}

var $internalHooks = ['data', 'beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeDestroy', 'destroyed', 'beforeUpdate', 'updated', 'activated', 'deactivated', 'render', 'errorCaptured', 'serverPrefetch' // 2.6
];
function componentFactory(Component) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  options.name = options.name || Component._componentTag || Component.name; // prototype props.

  var proto = Component.prototype;
  Object.getOwnPropertyNames(proto).forEach(function (key) {
    if (key === 'constructor') {
      return;
    } // hooks


    if ($internalHooks.indexOf(key) > -1) {
      options[key] = proto[key];
      return;
    }

    var descriptor = Object.getOwnPropertyDescriptor(proto, key);

    if (descriptor.value !== void 0) {
      // methods
      if (typeof descriptor.value === 'function') {
        (options.methods || (options.methods = {}))[key] = descriptor.value;
      } else {
        // typescript decorated data
        (options.mixins || (options.mixins = [])).push({
          data: function data() {
            return _defineProperty({}, key, descriptor.value);
          }
        });
      }
    } else if (descriptor.get || descriptor.set) {
      // computed properties
      (options.computed || (options.computed = {}))[key] = {
        get: descriptor.get,
        set: descriptor.set
      };
    }
  });
  (options.mixins || (options.mixins = [])).push({
    data: function data() {
      return collectDataFromConstructor(this, Component);
    }
  }); // decorate options

  var decorators = Component.__decorators__;

  if (decorators) {
    decorators.forEach(function (fn) {
      return fn(options);
    });
    delete Component.__decorators__;
  } // find super


  var superProto = Object.getPrototypeOf(Component.prototype);
  var Super = superProto instanceof Vue ? superProto.constructor : Vue;
  var Extended = Super.extend(options);
  forwardStaticMembers(Extended, Component, Super);

  if (reflectionIsSupported()) {
    copyReflectionMetadata(Extended, Component);
  }

  return Extended;
}
var reservedPropertyNames = [// Unique id
'cid', // Super Vue constructor
'super', // Component options that will be used by the component
'options', 'superOptions', 'extendOptions', 'sealedOptions', // Private assets
'component', 'directive', 'filter'];
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
    } // Some browsers does not allow reconfigure built-in properties


    var extendedDescriptor = Object.getOwnPropertyDescriptor(Extended, key);

    if (extendedDescriptor && !extendedDescriptor.configurable) {
      return;
    }

    var descriptor = Object.getOwnPropertyDescriptor(Original, key); // If the user agent does not support `__proto__` or its family (IE <= 10),
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

      if (!isPrimitive(descriptor.value) && superDescriptor && superDescriptor.value === descriptor.value) {
        return;
      }
    } // Warn if the users manually declare reserved properties


    if (process.env.NODE_ENV !== 'production' && reservedPropertyNames.indexOf(key) >= 0) {
      warn("Static property name '".concat(key, "' declared on class '").concat(Original.name, "' ") + 'conflicts with reserved property name of Vue internal. ' + 'It may cause unexpected behavior of the component. Consider renaming the property.');
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
  $internalHooks.push.apply($internalHooks, _toConsumableArray(keys));
};

/** vue-property-decorator verson 8.4.0 MIT LICENSE copyright 2019 kaorun343 */
/** Used for keying reactive provide/inject properties */
var reactiveInjectKey = '__reactiveInject__';
/**
 * decorator of an inject
 * @param from key
 * @return PropertyDecorator
 */
function Inject(options) {
    return createDecorator(function (componentOptions, key) {
        if (typeof componentOptions.inject === 'undefined') {
            componentOptions.inject = {};
        }
        if (!Array.isArray(componentOptions.inject)) {
            componentOptions.inject[key] = options || key;
        }
    });
}
function produceProvide(original) {
    var provide = function () {
        var _this = this;
        var rv = typeof original === 'function' ? original.call(this) : original;
        rv = Object.create(rv || null);
        // set reactive services (propagates previous services if necessary)
        rv[reactiveInjectKey] = this[reactiveInjectKey] || {};
        for (var i in provide.managed) {
            rv[provide.managed[i]] = this[i];
        }
        var _loop_1 = function (i) {
            rv[provide.managedReactive[i]] = this_1[i]; // Duplicates the behavior of `@Provide`
            Object.defineProperty(rv[reactiveInjectKey], provide.managedReactive[i], {
                enumerable: true,
                get: function () { return _this[i]; },
            });
        };
        var this_1 = this;
        for (var i in provide.managedReactive) {
            _loop_1(i);
        }
        return rv;
    };
    provide.managed = {};
    provide.managedReactive = {};
    return provide;
}
function needToProduceProvide(original) {
    return (typeof original !== 'function' ||
        (!original.managed && !original.managedReactive));
}
/**
 * decorator of a provide
 * @param key key
 * @return PropertyDecorator | void
 */
function Provide(key) {
    return createDecorator(function (componentOptions, k) {
        var provide = componentOptions.provide;
        if (needToProduceProvide(provide)) {
            provide = componentOptions.provide = produceProvide(provide);
        }
        provide.managed[k] = key || k;
    });
}
/** @see {@link https://github.com/vuejs/vue-class-component/blob/master/src/reflect.ts} */
var reflectMetadataIsSupported = typeof Reflect !== 'undefined' && typeof Reflect.getMetadata !== 'undefined';
function applyMetadata(options, target, key) {
    if (reflectMetadataIsSupported) {
        if (!Array.isArray(options) &&
            typeof options !== 'function' &&
            typeof options.type === 'undefined') {
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
        createDecorator(function (componentOptions, k) {
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
        createDecorator(function (componentOptions, k) {
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
    return createDecorator(function (componentOptions, handler) {
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
            return returnValue;
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
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
    /** Load dialog then open it */
    CreateDialogComponent.prototype.loadAndOpen = function (payload) {
        this.getDialog().reset();
        this.getDialog().load(payload);
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
                        showError(this, err_3);
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
 * Create URL for core API request.
 * @param store
 */
function createCoreApiUrl(store) {
    var get = store.getters;
    return get.protocol + "://" + get.server + ":" + get.port + "/sitewhere/api/";
}
/**
 * Create URL for auth API request.
 * @param store
 */
function createAuthApiUrl(store) {
    var get = store.getters;
    return get.protocol + "://" + get.server + ":" + get.port + "/sitewhere/authapi/";
}
/**
 * Create URL for web socket request.
 * @param store
 */
function createAdminWebSocketUrl(store) {
    var get = store.getters;
    return get.protocol + "://" + get.server + ":" + get.port + "/sitewhere/ws/admin/";
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
    return SiteWhere.Auth.createJwtRequest(baseUrl, jwt, tenantId, tenantAuth);
}
/**
 * Create Axios instance for making auth API call.
 * @param store
 */
function createAuthApiCall(store) {
    var baseUrl = createAuthApiUrl(store);
    var authToken = store.getters.authToken;
    return SiteWhere.Auth.createBasicAuthRequest(baseUrl, authToken);
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
    var api = SiteWhere.AuthAPI.Jwt.getJwt(axios);
    return loaderWrapper(store, api);
}

/**
 * Create a new area type.
 * @param store
 * @param request
 */
function createAreaType(store, request) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.AreaTypes.createAreaType(axios, request);
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
    var api = SiteWhere.API.AreaTypes.getAreaType(axios, token, format);
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
    var api = SiteWhere.API.AreaTypes.updateAreaType(axios, token, request);
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
    var api = SiteWhere.API.AreaTypes.listAreaTypes(axios, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * Delete an existing area type.
 * @param store
 * @param token
 */
function deleteAreaType(store, token) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.AreaTypes.deleteAreaType(axios, token);
    return loaderWrapper(store, api);
}

/**
 * Create a new area.
 * @param store
 * @param request
 */
function createArea(store, request) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.Areas.createArea(axios, request);
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
    var api = SiteWhere.API.Areas.getArea(axios, token, format);
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
    var api = SiteWhere.API.Areas.updateArea(axios, token, request);
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
    var api = SiteWhere.API.Areas.listAreas(axios, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * Delete an area.
 * @param store
 * @param token
 */
function deleteArea(store, token) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.Areas.deleteArea(axios, token);
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
    var api = SiteWhere.API.Areas.listAssignmentsForArea(axios, token, criteria, format);
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
    var api = SiteWhere.API.Areas.listLocationsForArea(axios, token, criteria, format);
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
    var api = SiteWhere.API.Areas.listMeasurementsForArea(axios, token, criteria, format);
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
    var api = SiteWhere.API.Areas.listAlertsForArea(axios, token, criteria, format);
    return loaderWrapper(store, api);
}

/**
 * Create a new asset type.
 * @param store
 * @param request
 */
function createAssetType(store, request) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.AssetTypes.createAssetType(axios, request);
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
    var api = SiteWhere.API.AssetTypes.getAssetType(axios, token, format);
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
    var api = SiteWhere.API.AssetTypes.updateAssetType(axios, token, request);
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
    var api = SiteWhere.API.AssetTypes.listAssetTypes(axios, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * Delete an existing asset type.
 * @param store
 * @param token
 */
function deleteAssetType(store, token) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.AssetTypes.deleteAssetType(axios, token);
    return loaderWrapper(store, api);
}

/**
 * Create a new asset.
 * @param store
 * @param request
 */
function createAsset(store, request) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.Assets.createAsset(axios, request);
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
    var api = SiteWhere.API.Assets.getAsset(axios, token, format);
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
    var api = SiteWhere.API.Assets.updateAsset(axios, token, request);
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
    var api = SiteWhere.API.Assets.listAssets(axios, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * Delete an existing asset.
 * @param store
 * @param token
 */
function deleteAsset(store, token) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.Assets.deleteAsset(axios, token);
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
    var api = SiteWhere.API.BatchOperations.getBatchOperation(axios, token, format);
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
    var api = SiteWhere.API.BatchOperations.listBatchOperations(axios, criteria, format);
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
    var api = SiteWhere.API.BatchOperations.listBatchOperationElements(axios, token, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * Create a batch command invocation.
 * @param store
 * @param request
 */
function createBatchCommandInvocation(store, request) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.BatchOperations.createBatchCommandInvocation(axios, request);
    return loaderWrapper(store, api);
}
/**
 * Create command invocations based on device criteria.
 * @param store
 * @param request
 */
function createInvocationsByDeviceCriteria(store, request) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.BatchOperations.createInvocationsByDeviceCriteria(axios, request);
    return loaderWrapper(store, api);
}
/**
 * Create command invocations based on assignment criteria.
 * @param store
 * @param request
 */
function createInvocationsByAssignmentCriteria(store, request) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.BatchOperations.createInvocationsByAssignmentCriteria(axios, request);
    return loaderWrapper(store, api);
}

/**
 * Create a new customer type.
 * @param store
 * @param request
 */
function createCustomerType(store, request) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.CustomerTypes.createCustomerType(axios, request);
    return loaderWrapper(store, api);
}
/**
 * Get customer type by token.
 * @param store
 * @param token
 */
function getCustomerType(store, token, format) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.CustomerTypes.getCustomerType(axios, token, format);
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
    var api = SiteWhere.API.CustomerTypes.updateCustomerType(axios, token, request);
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
    var api = SiteWhere.API.CustomerTypes.listCustomerTypes(axios, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * Delete an existing customer type.
 * @param store
 * @param token
 */
function deleteCustomerType(store, token) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.CustomerTypes.deleteCustomerType(axios, token);
    return loaderWrapper(store, api);
}

/**
 * Create a new customer.
 * @param store
 * @param request
 */
function createCustomer(store, request) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.Customers.createCustomer(axios, request);
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
    var api = SiteWhere.API.Customers.getCustomer(axios, token, format);
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
    var api = SiteWhere.API.Customers.updateCustomer(axios, token, request);
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
    var api = SiteWhere.API.Customers.listCustomers(axios, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * Delete an existing customer.
 * @param store
 * @param token
 */
function deleteCustomer(store, token) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.Customers.deleteCustomer(axios, token);
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
    var api = SiteWhere.API.Customers.listAssignmentsForCustomer(axios, token, criteria, format);
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
    var api = SiteWhere.API.Customers.listLocationsForCustomer(axios, token, criteria, format);
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
    var api = SiteWhere.API.Customers.listMeasurementsForCustomer(axios, token, criteria, format);
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
    var api = SiteWhere.API.Customers.listAlertsForCustomer(axios, token, criteria, format);
    return loaderWrapper(store, api);
}

/**
 * Create a device assignment.
 * @param store
 * @param request
 */
function createDeviceAssignment(store, request) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.DeviceAssignments.createDeviceAssignment(axios, request);
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
    var api = SiteWhere.API.DeviceAssignments.getDeviceAssignment(axios, token, format);
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
    var api = SiteWhere.API.DeviceAssignments.listDeviceAssignments(axios, criteria, format);
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
    var api = SiteWhere.API.DeviceAssignments.searchDeviceAssignments(axios, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * Delete an existing device assignment.
 * @param store
 * @param token
 */
function deleteDeviceAssignment(store, token) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.DeviceAssignments.deleteDeviceAssignment(axios, token);
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
    var api = SiteWhere.API.DeviceAssignments.createMeasurementForAssignment(axios, token, request);
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
    var api = SiteWhere.API.DeviceAssignments.listMeasurementsForAssignment(axios, token, criteria, format);
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
    var api = SiteWhere.API.DeviceAssignments.listMeasurementsForAssignmentAsChartSeries(axios, token, criteria, format);
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
    var api = SiteWhere.API.DeviceAssignments.createLocationForAssignment(axios, token, request);
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
    var api = SiteWhere.API.DeviceAssignments.listLocationsForAssignment(axios, token, criteria, format);
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
    var api = SiteWhere.API.DeviceAssignments.createAlertForAssignment(axios, token, request);
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
    var api = SiteWhere.API.DeviceAssignments.listAlertsForAssignment(axios, token, criteria, format);
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
    var api = SiteWhere.API.DeviceAssignments.createCommandInvocationForAssignment(axios, token, request);
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
    var api = SiteWhere.API.DeviceAssignments.scheduleCommandInvocationForAssignment(axios, token, scheduleToken, request);
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
    var api = SiteWhere.API.DeviceAssignments.listCommandInvocationsForAssignment(axios, token, criteria, format);
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
    var api = SiteWhere.API.DeviceAssignments.listCommandResponsesForAssignment(axios, token, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * Release an active device assignment.
 * @param store
 * @param token
 */
function releaseAssignment(store, token) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.DeviceAssignments.releaseDeviceAssignment(axios, token);
    return loaderWrapper(store, api);
}
/**
 * Mark a device assignment as missing.
 * @param store
 * @param token
 */
function missingAssignment(store, token) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.DeviceAssignments.missingDeviceAssignment(axios, token);
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
    var api = SiteWhere.API.DeviceCommands.listDeviceCommands(axios, criteria, format);
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
    var api = SiteWhere.API.DeviceCommands.listDeviceCommandsForNamespace(axios, criteria, format);
    return loaderWrapper(store, api);
}

/**
 * Create a new device group.
 * @param store
 * @param request
 */
function createDeviceGroup(store, request) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.DeviceGroups.createDeviceGroup(axios, request);
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
    var api = SiteWhere.API.DeviceGroups.getDeviceGroup(axios, token, format);
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
    var api = SiteWhere.API.DeviceGroups.updateDeviceGroup(axios, token, request);
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
    var api = SiteWhere.API.DeviceGroups.listDeviceGroups(axios, criteria, format);
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
    var api = SiteWhere.API.DeviceGroups.listDeviceGroupElements(axios, token, criteria, format);
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
    var api = SiteWhere.API.DeviceGroups.createDeviceGroupElements(axios, token, request);
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
    var api = SiteWhere.API.DeviceGroups.deleteDeviceGroupElement(axios, token, elementId);
    return loaderWrapper(store, api);
}
/**
 * Delete a device group.
 * @param store
 * @param token
 */
function deleteDeviceGroup(store, token) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.DeviceGroups.deleteDeviceGroup(axios, token);
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
    var api = SiteWhere.API.DeviceStates.searchDeviceStates(axios, criteria, format);
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
    var api = SiteWhere.API.DeviceStatuses.listDeviceStatuses(axios, criteria, format);
    return loaderWrapper(store, api);
}

/**
 * Create a new device type.
 * @param store
 * @param request
 */
function createDeviceType(store, request) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.DeviceTypes.createDeviceType(axios, request);
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
    var api = SiteWhere.API.DeviceTypes.getDeviceType(axios, token, format);
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
    var api = SiteWhere.API.DeviceTypes.updateDeviceType(axios, token, request);
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
    var api = SiteWhere.API.DeviceTypes.listDeviceTypes(axios, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * Delete an existing device type.
 * @param store
 * @param token
 */
function deleteDeviceType(store, token) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.DeviceTypes.deleteDeviceType(axios, token);
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
    var api = SiteWhere.API.DeviceTypes.createDeviceCommand(axios, deviceTypeToken, request);
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
    var api = SiteWhere.API.DeviceTypes.getDeviceCommand(axios, deviceTypeToken, commandToken, format);
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
    var api = SiteWhere.API.DeviceTypes.updateDeviceCommand(axios, deviceTypeToken, commandToken, request);
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
    var api = SiteWhere.API.DeviceTypes.deleteDeviceCommand(axios, deviceTypeToken, commandToken);
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
    var api = SiteWhere.API.DeviceTypes.createDeviceStatus(axios, deviceTypeToken, request);
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
    var api = SiteWhere.API.DeviceTypes.getDeviceStatus(axios, deviceTypeToken, statusToken, format);
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
    var api = SiteWhere.API.DeviceTypes.updateDeviceStatus(axios, deviceTypeToken, statusToken, request);
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
    var api = SiteWhere.API.DeviceTypes.deleteDeviceStatus(axios, deviceTypeToken, statusToken);
    return loaderWrapper(store, api);
}

/**
 * Create a device.
 * @param store
 * @param request
 */
function createDevice(store, request) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.Devices.createDevice(axios, request);
    return loaderWrapper(store, api);
}
/**
 * Get a device by token.
 * @param store
 * @param token
 */
function getDevice(store, token, format) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.Devices.getDevice(axios, token, format);
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
    var api = SiteWhere.API.Devices.updateDevice(axios, token, request);
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
    var api = SiteWhere.API.Devices.listDevices(axios, criteria, format);
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
    var api = SiteWhere.API.Devices.listDeviceAssignmentHistory(axios, token, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * Delete an existing device.
 * @param store
 * @param token
 */
function deleteDevice(store, token) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.Devices.deleteDevice(axios, token);
    return loaderWrapper(store, api);
}

/**
 * Get currently effective instance configuration.
 * @param store
 */
function getInstanceConfiguration(store) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.Instance.getInstanceConfiguration(axios);
    return loaderWrapper(store, api);
}
/**
 * Update the global instance configuration.
 * @param store
 * @param request
 */
function updateInstanceConfiguration(store, request) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.Instance.updateInstanceConfiguration(axios, request);
    return loaderWrapper(store, api);
}
/**
 * Get instance topology information.
 * @param store
 */
function getInstanceMicroservices(store) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.Instance.getInstanceMicroservices(axios);
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
    var api = SiteWhere.API.Instance.getTenantEngineConfiguration(axios, functionalArea, tenant);
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
    var api = SiteWhere.API.Instance.updateTenantEngineConfiguration(axios, functionalArea, tenant, configuration);
    return loaderWrapper(store, api);
}

/**
 * Create a new schedule.
 * @param store
 * @param request
 */
function createSchedule(store, request) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.Schedules.createSchedule(axios, request);
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
    var api = SiteWhere.API.Schedules.getSchedule(axios, token, format);
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
    var api = SiteWhere.API.Schedules.updateSchedule(axios, token, request);
    return loaderWrapper(store, api);
}
/**
 * Delete an existing schedule.
 * @param store
 * @param token
 */
function deleteSchedule(store, token) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.Schedules.deleteSchedule(axios, token);
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
    var api = SiteWhere.API.Schedules.listSchedules(axios, criteria, format);
    return loaderWrapper(store, api);
}

/**
 * List all script categories for a functional area.
 * @param store
 * @param identifier
 */
function listScriptCategories(store, identifier) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.Scripting.listScriptCategories(axios, identifier);
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
    var api = SiteWhere.API.Scripting.listScriptTemplates(axios, identifier, category);
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
    var api = SiteWhere.API.Scripting.listTenantScripts(axios, identifier, tenantToken);
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
    var api = SiteWhere.API.Scripting.listTenantScriptsForCategory(axios, identifier, tenantToken, category);
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
    var api = SiteWhere.API.Scripting.listTenantScriptsByCategory(axios, identifier, tenantToken);
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
    var api = SiteWhere.API.Scripting.getTenantScript(axios, identifier, tenantToken, scriptId);
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
    var api = SiteWhere.API.Scripting.createTenantScript(axios, identifier, tenantToken, request);
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
    var api = SiteWhere.API.Scripting.getTenantScriptContent(axios, identifier, tenantToken, scriptId, versionId);
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
    var api = SiteWhere.API.Scripting.updateTenantScript(axios, identifier, tenantToken, scriptId, versionId, request);
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
    var api = SiteWhere.API.Scripting.cloneTenantScript(axios, identifier, tenantToken, scriptId, versionId, request);
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
    var api = SiteWhere.API.Scripting.activateTenantScript(axios, identifier, tenantToken, scriptId, versionId);
    return loaderWrapper(store, api);
}

/**
 * Create a new system tenant.
 * @param store
 * @param request
 */
function createTenant(store, request) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.Tenants.createTenant(axios, request);
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
    var api = SiteWhere.API.Tenants.getTenant(axios, token, format);
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
    var api = SiteWhere.API.Tenants.updateTenant(axios, token, request);
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
    var api = SiteWhere.API.Tenants.listTenants(axios, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * Delete an existing system tenant.
 * @param store
 * @param token
 */
function deleteTenant(store, token) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.Tenants.deleteTenant(axios, token);
    return loaderWrapper(store, api);
}
/**
 * List available tenant configuration templates.
 * @param store
 */
function listTenantConfigurationTemplates(store) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.Tenants.listTenantConfigurationTemplates(axios);
    return loaderWrapper(store, api);
}
/**
 * List available dataset templates.
 * @param store
 */
function listTenantDatasetTemplates(store) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.Tenants.listTenantDatasetTemplates(axios);
    return loaderWrapper(store, api);
}

/**
 * Create a new system user.
 * @param store
 * @param payload
 */
function createUser(store, request) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.Users.createUser(axios, request);
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
    var api = SiteWhere.API.Users.getUser(axios, username, format);
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
    var api = SiteWhere.API.Users.updateUser(axios, username, request);
    return loaderWrapper(store, api);
}
/**
 * Delete an existing system user.
 * @param store
 * @param username
 */
function deleteUser(store, username) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.Users.deleteUser(axios, username);
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
    var api = SiteWhere.API.Users.listUsers(axios, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * Get parent/child hierarchy for granted authorities.
 * @param store
 */
function getAuthoritiesHierarchy(store) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.Users.getAuthoritiesHierarchy(axios);
    return loaderWrapper(store, api);
}

/**
 * Create a new zone.
 * @param store
 * @param request
 */
function createZone(store, request) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.Zones.createZone(axios, request);
    return loaderWrapper(store, api);
}
/**
 * Get a zone by unique token.
 * @param store
 * @param token
 */
function getZone(store, token) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.Zones.getZone(axios, token);
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
    var api = SiteWhere.API.Zones.updateZone(axios, token, request);
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
    var api = SiteWhere.API.Zones.listZones(axios, criteria, format);
    return loaderWrapper(store, api);
}
/**
 * Delete an existing zone.
 * @param store
 * @param token
 */
function deleteZone(store, token) {
    var axios = createCoreApiCall(store);
    var api = SiteWhere.API.Zones.deleteZone(axios, token);
    return loaderWrapper(store, api);
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
exports.Mixins = mixins;
exports.Model = Model;
exports.Prop = Prop;
exports.Provide = Provide;
exports.Watch = Watch;
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
exports.getAuthoritiesHierarchy = getAuthoritiesHierarchy;
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
exports.listDeviceTypes = listDeviceTypes;
exports.listDevices = listDevices;
exports.listLocationsForArea = listLocationsForArea;
exports.listLocationsForAssignment = listLocationsForAssignment;
exports.listLocationsForCustomer = listLocationsForCustomer;
exports.listMeasurementsForArea = listMeasurementsForArea;
exports.listMeasurementsForAssignment = listMeasurementsForAssignment;
exports.listMeasurementsForAssignmentAsChartSeries = listMeasurementsForAssignmentAsChartSeries;
exports.listMeasurementsForCustomer = listMeasurementsForCustomer;
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
