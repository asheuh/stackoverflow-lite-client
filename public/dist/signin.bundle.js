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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/pages/login.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/pages/login.js":
/*!****************************!*\
  !*** ./src/pages/login.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _api = __webpack_require__(/*! ../utils/api */ "./src/utils/api.js");

var _api2 = _interopRequireDefault(_api);

var _auth = __webpack_require__(/*! ../utils/auth */ "./src/utils/auth.js");

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handleLogin = function handleLogin() {
    login.addEventListener("click", function (event) {
        event.preventDefault();

        var data = {
            username: username.value,
            password: password.value
        };

        _api2.default.post("/auth/login", data).then(function (res) {
            return res.json();
        }).catch(function (error) {
            return console.error('Error ' + error);
        }).then(function (data) {
            if (data.message === "Successfully logged in") {
                var status = document.getElementById('message');
                _auth2.default.setToken(data.access_token);
                redirect: window.location.replace("/questions");
            } else {
                var err = document.getElementById('message');
                err.style.backgroundColor = "#FCDFDF";
                err.style.padding = "8px";
                err.style.color = "red";
                err.innerHTML = data.message;
            }
        });
    });
};

handleLogin();

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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL2xvZ2luLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2F1dGguanMiXSwibmFtZXMiOlsiaGFuZGxlTG9naW4iLCJsb2dpbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiZGF0YSIsInVzZXJuYW1lIiwidmFsdWUiLCJwYXNzd29yZCIsImFwaSIsInBvc3QiLCJ0aGVuIiwicmVzIiwianNvbiIsImNhdGNoIiwiY29uc29sZSIsImVycm9yIiwibWVzc2FnZSIsInN0YXR1cyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhdXRoIiwic2V0VG9rZW4iLCJhY2Nlc3NfdG9rZW4iLCJyZWRpcmVjdCIsIndpbmRvdyIsImxvY2F0aW9uIiwicmVwbGFjZSIsImVyciIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwicGFkZGluZyIsImNvbG9yIiwiaW5uZXJIVE1MIiwiQXBpIiwiYmFzZVVybCIsImVuZHBvaW50IiwidG9rZW4iLCJmZXRjaCIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiaGVhZGVycyIsIkFjY2VwdCIsIkF1dGhvcml6YXRpb24iLCJBdXRoZW50aWNhdGlvbiIsIlVzZXJJc0xvZ2dlZEluIiwic2VjcmV0a2V5IiwiZ2V0VG9rZW4iLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiZ2V0SXRlbSIsInJlbW92ZVRva2VuIiwicmVtb3ZlSXRlbSIsImxvZ091dCIsImVsZW1lbnQiLCJsb2dvdXQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7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LFlBQU1DLFlBQVksTUFBS0MsUUFBTCxFQUFsQjtBQUNBLFlBQUlELGNBQWMsSUFBZCxJQUFzQkEsY0FBYyxXQUF4QyxFQUFxRDtBQUNqRCxtQkFBTyxLQUFQO0FBQ0g7QUFDRCxlQUFPLElBQVA7QUFDSCxLOztTQUNEMUIsUSxHQUFXLFVBQUNlLEtBQUQsRUFBVztBQUNsQixlQUFPYSxhQUFhQyxPQUFiLENBQXFCLGNBQXJCLEVBQXFDZCxLQUFyQyxDQUFQO0FBQ0gsSzs7U0FFRFksUSxHQUFXLFlBQU07QUFDYixlQUFPQyxhQUFhRSxPQUFiLENBQXFCLGNBQXJCLENBQVA7QUFDSCxLOztTQUVEQyxXLEdBQWMsWUFBTTtBQUNoQixlQUFPSCxhQUFhSSxVQUFiLENBQXdCLGNBQXhCLENBQVA7QUFDSCxLOztTQUVEQyxNLEdBQVMsWUFBTTtBQUNYLFlBQUlDLFVBQVVyQyxTQUFTQyxjQUFULENBQXdCLFFBQXhCLENBQWQ7QUFDQXFDLGVBQU92RCxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxpQkFBUztBQUN0QyxrQkFBS21ELFdBQUw7QUFDQTdCLHNCQUFVQyxPQUFPQyxRQUFQLENBQWdCQyxPQUFoQixDQUF3QixhQUF4QjtBQUNiLFNBSEQ7QUFJSCxLOzs7QUFFTCxJQUFNTixPQUFPLElBQUl5QixjQUFKLEVBQWI7a0JBQ2V6QixJIiwiZmlsZSI6InNpZ25pbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9wYWdlcy9sb2dpbi5qc1wiKTtcbiIsImltcG9ydCBhcGkgZnJvbSBcIi4uL3V0aWxzL2FwaVwiO1xuaW1wb3J0IGF1dGggZnJvbSBcIi4uL3V0aWxzL2F1dGhcIjtcblxuY29uc3QgaGFuZGxlTG9naW4gPSAoKSA9PiB7XG4gICAgbG9naW4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50ID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lLnZhbHVlLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkLnZhbHVlXG4gICAgICAgIH07XG5cbiAgICAgICAgYXBpLnBvc3QoXCIvYXV0aC9sb2dpblwiLCBkYXRhKVxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcignRXJyb3IgJyArIGVycm9yKSlcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLm1lc3NhZ2UgPT09IFwiU3VjY2Vzc2Z1bGx5IGxvZ2dlZCBpblwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzdGF0dXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVzc2FnZScpXG4gICAgICAgICAgICAgICAgICAgIGF1dGguc2V0VG9rZW4oZGF0YS5hY2Nlc3NfdG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICByZWRpcmVjdDogd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoXCIvcXVlc3Rpb25zXCIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBlcnIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVzc2FnZScpXG4gICAgICAgICAgICAgICAgICAgIGVyci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNGQ0RGREZcIjtcbiAgICAgICAgICAgICAgICAgICAgZXJyLnN0eWxlLnBhZGRpbmcgPSBcIjhweFwiO1xuICAgICAgICAgICAgICAgICAgICBlcnIuc3R5bGUuY29sb3IgPSBcInJlZFwiO1xuICAgICAgICAgICAgICAgICAgICBlcnIuaW5uZXJIVE1MID0gZGF0YS5tZXNzYWdlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5oYW5kbGVMb2dpbigpO1xuIiwiY2xhc3MgQXBpIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5iYXNlVXJsID0gXCJodHRwOi8vMTI3LjAuMC4xOjUwMDAvYXBpL3YyXCI7XG4gICAgfVxuXG4gICAgcG9zdChlbmRwb2ludCwgZGF0YSwgdG9rZW4gPSBudWxsKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChgJHt0aGlzLmJhc2VVcmx9JHtlbmRwb2ludH1gLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWAsXG4gICAgICAgICAgICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0KGVuZHBvaW50LCB0b2tlbikge1xuICAgICAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5iYXNlVXJsfSR7ZW5kcG9pbnR9YCwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gLFxuICAgICAgICAgICAgICAgIFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuY29uc3QgYXBpID0gbmV3IEFwaSgpO1xuZXhwb3J0IGRlZmF1bHQgYXBpO1xuIiwiY2xhc3MgQXV0aGVudGljYXRpb24ge1xuXG4gICAgVXNlcklzTG9nZ2VkSW4gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNlY3JldGtleSA9IHRoaXMuZ2V0VG9rZW4oKVxuICAgICAgICBpZiAoc2VjcmV0a2V5ID09PSBudWxsIHx8IHNlY3JldGtleSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgc2V0VG9rZW4gPSAodG9rZW4pID0+IHtcbiAgICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhY2Nlc3NfdG9rZW4nLCB0b2tlbik7XG4gICAgfVxuXG4gICAgZ2V0VG9rZW4gPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWNjZXNzX3Rva2VuJyk7XG4gICAgfVxuXG4gICAgcmVtb3ZlVG9rZW4gPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnYWNjZXNzX3Rva2VuJyk7XG4gICAgfVxuXG4gICAgbG9nT3V0ID0gKCkgPT4ge1xuICAgICAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9nb3V0XCIpO1xuICAgICAgICBsb2dvdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlVG9rZW4oKTtcbiAgICAgICAgICAgIHJlZGlyZWN0OiB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShcIi9hdXRoL2xvZ2luXCIpO1xuICAgICAgICB9KVxuICAgIH1cbn1cbmNvbnN0IGF1dGggPSBuZXcgQXV0aGVudGljYXRpb24oKTtcbmV4cG9ydCBkZWZhdWx0IGF1dGg7XG4iXSwic291cmNlUm9vdCI6IiJ9