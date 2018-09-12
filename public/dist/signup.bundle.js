/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/pages/signup.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/pages/signup.js":
/*!*****************************!*\
  !*** ./src/pages/signup.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _api = __webpack_require__(/*! ../utils/api */ "./src/utils/api.js");

var _api2 = _interopRequireDefault(_api);

var _auth = __webpack_require__(/*! ../utils/auth */ "./src/utils/auth.js");

var _auth2 = _interopRequireDefault(_auth);

var _homepage = __webpack_require__(/*! ../utils/homepage */ "./src/utils/homepage.js");

var _homepage2 = _interopRequireDefault(_homepage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handleSignup = function handleSignup() {
    register.addEventListener("click", function (event) {
        event.preventDefault();

        var data = {
            name: fullname.value,
            username: username.value,
            email: email.value,
            password: password.value
        };

        _api2.default.post("/auth/register", data).then(function (res) {
            return res.json();
        }).catch(function (error) {
            return console.error('Error ' + error);
        }).then(function (data) {
            if (data.message === "User created successfully") {
                _auth2.default.setToken(data.access_token);
                redirect: window.location.replace("/questions");
            } else if (data.message !== "User created successfully") {
                var err = document.getElementById('message');
                for (var key in data.message) {
                    err.style.display = 'block';
                    err.style.backgroundColor = "#FCDFDF";
                    err.style.padding = "8px";
                    err.style.color = "red";
                    err.innerHTML = data.message[key];
                }
            } else {
                window.location.reload();
            }
        });
    });
};

handleSignup();

/***/ }),

/***/ "./src/utils/api.js":
/*!**************************!*\
  !*** ./src/utils/api.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Api = function () {
    function Api() {
        _classCallCheck(this, Api);

        this.baseUrl = "http://127.0.0.1:5000/api/v2";
    }

    _createClass(Api, [{
        key: "post",
        value: function post(endpoint, data) {
            var token = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            return fetch("" + this.baseUrl + endpoint, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    Accept: 'application/json',
                    Authorization: "Bearer " + token,
                    "content-type": "application/json"
                }
            });
        }
    }, {
        key: "get",
        value: function get(endpoint, token) {
            return fetch("" + this.baseUrl + endpoint, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token,
                    "content-type": "application/json"
                }
            });
        }
    }]);

    return Api;
}();

var api = new Api();
exports.default = api;

/***/ }),

/***/ "./src/utils/auth.js":
/*!***************************!*\
  !*** ./src/utils/auth.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Authentication = function Authentication() {
    var _this = this;

    _classCallCheck(this, Authentication);

    this.UserIsLoggedIn = function () {
        var secretkey = _this.getToken();
        if (secretkey === null || secretkey === 'undefined') {
            return false;
        }
        return true;
    };

    this.setToken = function (token) {
        return localStorage.setItem('access_token', token);
    };

    this.getToken = function () {
        return localStorage.getItem('access_token');
    };

    this.removeToken = function () {
        return localStorage.removeItem('access_token');
    };

    this.logOut = function () {
        var element = document.getElementById("logout");
        logout.addEventListener("click", function (event) {
            _this.removeToken();
            redirect: window.location.replace("/auth/login");
        });
    };
};

var auth = new Authentication();
exports.default = auth;

/***/ }),

/***/ "./src/utils/homepage.js":
/*!*******************************!*\
  !*** ./src/utils/homepage.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _auth = __webpack_require__(/*! ../utils/auth */ "./src/utils/auth.js");

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HomePage = function HomePage() {
    _classCallCheck(this, HomePage);

    this.GetProtectedRoute = function (route) {
        return route;
    };

    this.UserLogout = function () {
        _auth2.default.removeToken();
    };
};

var home = new HomePage();
exports.default = home;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL3NpZ251cC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvYXBpLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9hdXRoLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9ob21lcGFnZS5qcyJdLCJuYW1lcyI6WyJoYW5kbGVTaWdudXAiLCJyZWdpc3RlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiZGF0YSIsIm5hbWUiLCJmdWxsbmFtZSIsInZhbHVlIiwidXNlcm5hbWUiLCJlbWFpbCIsInBhc3N3b3JkIiwiYXBpIiwicG9zdCIsInRoZW4iLCJyZXMiLCJqc29uIiwiY2F0Y2giLCJjb25zb2xlIiwiZXJyb3IiLCJtZXNzYWdlIiwiYXV0aCIsInNldFRva2VuIiwiYWNjZXNzX3Rva2VuIiwicmVkaXJlY3QiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInJlcGxhY2UiLCJlcnIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwia2V5Iiwic3R5bGUiLCJkaXNwbGF5IiwiYmFja2dyb3VuZENvbG9yIiwicGFkZGluZyIsImNvbG9yIiwiaW5uZXJIVE1MIiwicmVsb2FkIiwiQXBpIiwiYmFzZVVybCIsImVuZHBvaW50IiwidG9rZW4iLCJmZXRjaCIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiaGVhZGVycyIsIkFjY2VwdCIsIkF1dGhvcml6YXRpb24iLCJBdXRoZW50aWNhdGlvbiIsIlVzZXJJc0xvZ2dlZEluIiwic2VjcmV0a2V5IiwiZ2V0VG9rZW4iLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiZ2V0SXRlbSIsInJlbW92ZVRva2VuIiwicmVtb3ZlSXRlbSIsImxvZ091dCIsImVsZW1lbnQiLCJsb2dvdXQiLCJIb21lUGFnZSIsIkdldFByb3RlY3RlZFJvdXRlIiwicm91dGUiLCJVc2VyTG9n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QUFPLElBQUk4QixjQUFKLEVBQWI7a0JBQ2U5QixJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5QmY7Ozs7Ozs7O0lBRU0wQyxROzs7U0FFRkMsaUIsR0FBb0IsVUFBQ0MsS0FBRCxFQUFXO0FBQzNCLGVBQU9BLEtBQVA7QUFDSCxLOztTQUVEQyxVLEdBQWEsWUFBTTtBQUNmN0MsdUJBQUtxQyxXQUFMO0FBQ0gsSzs7O0FBR0wsSUFBTVMsT0FBTyxJQUFJSixRQUFKLEVBQWI7a0JBQ2VJLEkiLCJmaWxlIjoic2lnbnVwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3BhZ2VzL3NpZ251cC5qc1wiKTtcbiIsImltcG9ydCBhcGkgZnJvbSBcIi4uL3V0aWxzL2FwaVwiO1xuaW1wb3J0IGF1dGggZnJvbSBcIi4uL3V0aWxzL2F1dGhcIjtcbmltcG9ydCBob21lIGZyb20gXCIuLi91dGlscy9ob21lcGFnZVwiO1xuXG5jb25zdCBoYW5kbGVTaWdudXAgPSAoKSA9PiB7XG4gICAgcmVnaXN0ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50ID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgbmFtZTogZnVsbG5hbWUudmFsdWUsXG4gICAgICAgICAgICB1c2VybmFtZTogdXNlcm5hbWUudmFsdWUsXG4gICAgICAgICAgICBlbWFpbDogZW1haWwudmFsdWUsXG4gICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmQudmFsdWVcbiAgICAgICAgfTtcblxuICAgICAgICBhcGlcbiAgICAgICAgICAgIC5wb3N0KFwiL2F1dGgvcmVnaXN0ZXJcIiwgZGF0YSlcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoJ0Vycm9yICcgKyBlcnJvcikpXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5tZXNzYWdlID09PSBcIlVzZXIgY3JlYXRlZCBzdWNjZXNzZnVsbHlcIikge1xuICAgICAgICAgICAgICAgICAgICBhdXRoLnNldFRva2VuKGRhdGEuYWNjZXNzX3Rva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgcmVkaXJlY3Q6IHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKFwiL3F1ZXN0aW9uc1wiKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEubWVzc2FnZSAhPT0gXCJVc2VyIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVyciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZXNzYWdlJylcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIGRhdGEubWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjRkNERkRGXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnIuc3R5bGUucGFkZGluZyA9IFwiOHB4XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnIuc3R5bGUuY29sb3IgPSBcInJlZFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyLmlubmVySFRNTCA9IGRhdGEubWVzc2FnZVtrZXldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbmhhbmRsZVNpZ251cCgpOyIsImNsYXNzIEFwaSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYmFzZVVybCA9IFwiaHR0cDovLzEyNy4wLjAuMTo1MDAwL2FwaS92MlwiO1xuICAgIH1cblxuICAgIHBvc3QoZW5kcG9pbnQsIGRhdGEsIHRva2VuID0gbnVsbCkge1xuICAgICAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5iYXNlVXJsfSR7ZW5kcG9pbnR9YCwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gLFxuICAgICAgICAgICAgICAgIFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldChlbmRwb2ludCwgdG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke3RoaXMuYmFzZVVybH0ke2VuZHBvaW50fWAsIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dG9rZW59YCxcbiAgICAgICAgICAgICAgICBcImNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmNvbnN0IGFwaSA9IG5ldyBBcGkoKTtcbmV4cG9ydCBkZWZhdWx0IGFwaTtcbiIsImNsYXNzIEF1dGhlbnRpY2F0aW9uIHtcblxuICAgIFVzZXJJc0xvZ2dlZEluID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBzZWNyZXRrZXkgPSB0aGlzLmdldFRva2VuKClcbiAgICAgICAgaWYgKHNlY3JldGtleSA9PT0gbnVsbCB8fCBzZWNyZXRrZXkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHNldFRva2VuID0gKHRva2VuKSA9PiB7XG4gICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWNjZXNzX3Rva2VuJywgdG9rZW4pO1xuICAgIH1cblxuICAgIGdldFRva2VuID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FjY2Vzc190b2tlbicpO1xuICAgIH1cblxuICAgIHJlbW92ZVRva2VuID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2FjY2Vzc190b2tlbicpO1xuICAgIH1cblxuICAgIGxvZ091dCA9ICgpID0+IHtcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ291dFwiKTtcbiAgICAgICAgbG9nb3V0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudCA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVRva2VuKCk7XG4gICAgICAgICAgICByZWRpcmVjdDogd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoXCIvYXV0aC9sb2dpblwiKTtcbiAgICAgICAgfSlcbiAgICB9XG59XG5jb25zdCBhdXRoID0gbmV3IEF1dGhlbnRpY2F0aW9uKCk7XG5leHBvcnQgZGVmYXVsdCBhdXRoOyIsImltcG9ydCBhdXRoIGZyb20gXCIuLi91dGlscy9hdXRoXCI7XG5cbmNsYXNzIEhvbWVQYWdlIHtcblxuICAgIEdldFByb3RlY3RlZFJvdXRlID0gKHJvdXRlKSA9PiB7XG4gICAgICAgIHJldHVybiByb3V0ZTtcbiAgICB9XG5cbiAgICBVc2VyTG9nb3V0ID0gKCkgPT4ge1xuICAgICAgICBhdXRoLnJlbW92ZVRva2VuKCk7XG4gICAgfVxufVxuXG5jb25zdCBob21lID0gbmV3IEhvbWVQYWdlKCk7XG5leHBvcnQgZGVmYXVsdCBob21lO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==