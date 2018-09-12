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
                redirect: window.location.replace("../../templates/mains/allquestions.html");
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
            redirect: window.location.replace("../../templates/mains/signin.html");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL3NpZ251cC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvYXBpLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9hdXRoLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9ob21lcGFnZS5qcyJdLCJuYW1lcyI6WyJoYW5kbGVTaWdudXAiLCJyZWdpc3RlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiZGF0YSIsIm5hbWUiLCJmdWxsbmFtZSIsInZhbHVlIiwidXNlcm5hbWUiLCJlbWFpbCIsInBhc3N3b3JkIiwiYXBpIiwicG9zdCIsInRoZW4iLCJyZXMiLCJqc29uIiwiY2F0Y2giLCJjb25zb2xlIiwiZXJyb3IiLCJtZXNzYWdlIiwiYXV0aCIsInNldFRva2VuIiwiYWNjZXNzX3Rva2VuIiwicmVkaXJlY3QiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInJlcGxhY2UiLCJlcnIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwia2V5Iiwic3R5bGUiLCJkaXNwbGF5IiwiYmFja2dyb3VuZENvbG9yIiwicGFkZGluZyIsImNvbG9yIiwiaW5uZXJIVE1MIiwicmVsb2FkIiwiQXBpIiwiYmFzZVVybCIsImVuZHBvaW50IiwidG9rZW4iLCJmZXRjaCIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiaGVhZGVycyIsIkFjY2VwdCIsIkF1dGhvcml6YXRpb24iLCJBdXRoZW50aWNhdGlvbiIsIlVzZXJJc0xvZ2dlZEluIiwic2VjcmV0a2V5IiwiZ2V0VG9rZW4iLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiZ2V0SXRlbSIsInJlbW92ZVRva2VuIiwicmVtb3ZlSXRlbSIsImxvZ091dCIsImVsZW1lbnQiLCJsb2dvdXQiLCJIb21lUGFnZSIsIkdldFByb3RlY3RlZFJvdXRlIiwicm91dGUiLCJVc2VyTG9n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LE9BQU8sSUFBSThCLGNBQUosRUFBYjtrQkFDZTlCLEk7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlCZjs7Ozs7Ozs7SUFFTTBDLFE7OztTQUVGQyxpQixHQUFvQixVQUFDQyxLQUFELEVBQVc7QUFDM0IsZUFBT0EsS0FBUDtBQUNILEs7O1NBRURDLFUsR0FBYSxZQUFNO0FBQ2Y3Qyx1QkFBS3FDLFdBQUw7QUFDSCxLOzs7QUFHTCxJQUFNUyxPQUFPLElBQUlKLFFBQUosRUFBYjtrQkFDZUksSSIsImZpbGUiOiJzaWdudXAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvcGFnZXMvc2lnbnVwLmpzXCIpO1xuIiwiaW1wb3J0IGFwaSBmcm9tIFwiLi4vdXRpbHMvYXBpXCI7XG5pbXBvcnQgYXV0aCBmcm9tIFwiLi4vdXRpbHMvYXV0aFwiO1xuaW1wb3J0IGhvbWUgZnJvbSBcIi4uL3V0aWxzL2hvbWVwYWdlXCI7XG5cbmNvbnN0IGhhbmRsZVNpZ251cCA9ICgpID0+IHtcbiAgICByZWdpc3Rlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXZlbnQgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICBuYW1lOiBmdWxsbmFtZS52YWx1ZSxcbiAgICAgICAgICAgIHVzZXJuYW1lOiB1c2VybmFtZS52YWx1ZSxcbiAgICAgICAgICAgIGVtYWlsOiBlbWFpbC52YWx1ZSxcbiAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZC52YWx1ZVxuICAgICAgICB9O1xuXG4gICAgICAgIGFwaVxuICAgICAgICAgICAgLnBvc3QoXCIvYXV0aC9yZWdpc3RlclwiLCBkYXRhKVxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcignRXJyb3IgJysgZXJyb3IpKVxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubWVzc2FnZSA9PT0gXCJVc2VyIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgYXV0aC5zZXRUb2tlbihkYXRhLmFjY2Vzc190b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0OiB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShcIi4uLy4uL3RlbXBsYXRlcy9tYWlucy9hbGxxdWVzdGlvbnMuaHRtbFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS5tZXNzYWdlICE9PSBcIlVzZXIgY3JlYXRlZCBzdWNjZXNzZnVsbHlcIikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZXJyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lc3NhZ2UnKVxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gZGF0YS5tZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnIuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNGQ0RGREZcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyci5zdHlsZS5wYWRkaW5nID0gXCI4cHhcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyci5zdHlsZS5jb2xvciA9IFwicmVkXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnIuaW5uZXJIVE1MID0gZGF0YS5tZXNzYWdlW2tleV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuaGFuZGxlU2lnbnVwKCk7XG4iLCJjbGFzcyBBcGkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJhc2VVcmwgPSBcImh0dHA6Ly8xMjcuMC4wLjE6NTAwMC9hcGkvdjJcIjtcbiAgICB9XG5cbiAgICBwb3N0KGVuZHBvaW50LCBkYXRhLCB0b2tlbiA9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke3RoaXMuYmFzZVVybH0ke2VuZHBvaW50fWAsIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dG9rZW59YCxcbiAgICAgICAgICAgICAgICBcImNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQoZW5kcG9pbnQsIHRva2VuKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChgJHt0aGlzLmJhc2VVcmx9JHtlbmRwb2ludH1gLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWAsXG4gICAgICAgICAgICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5jb25zdCBhcGkgPSBuZXcgQXBpKCk7XG5leHBvcnQgZGVmYXVsdCBhcGk7XG4iLCJjbGFzcyBBdXRoZW50aWNhdGlvbiB7XG5cbiAgICBVc2VySXNMb2dnZWRJbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qgc2VjcmV0a2V5ID0gdGhpcy5nZXRUb2tlbigpXG4gICAgICAgIGlmIChzZWNyZXRrZXkgPT09IG51bGwgfHwgc2VjcmV0a2V5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBzZXRUb2tlbiA9ICh0b2tlbikgPT4ge1xuICAgICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FjY2Vzc190b2tlbicsIHRva2VuKTtcbiAgICB9XG5cbiAgICBnZXRUb2tlbiA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhY2Nlc3NfdG9rZW4nKTtcbiAgICB9XG5cbiAgICByZW1vdmVUb2tlbiA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdhY2Nlc3NfdG9rZW4nKTtcbiAgICB9XG5cbiAgICBsb2dPdXQgPSAoKSA9PiB7XG4gICAgICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dvdXRcIik7XG4gICAgICAgIGxvZ291dC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXZlbnQgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVUb2tlbigpO1xuICAgICAgICAgICAgcmVkaXJlY3Q6IHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKFwiLi4vLi4vdGVtcGxhdGVzL21haW5zL3NpZ25pbi5odG1sXCIpO1xuICAgICAgICB9KVxuICAgIH1cbn1cbmNvbnN0IGF1dGggPSBuZXcgQXV0aGVudGljYXRpb24oKTtcbmV4cG9ydCBkZWZhdWx0IGF1dGg7XG4iLCJpbXBvcnQgYXV0aCBmcm9tIFwiLi4vdXRpbHMvYXV0aFwiO1xuXG5jbGFzcyBIb21lUGFnZSB7XG5cbiAgICBHZXRQcm90ZWN0ZWRSb3V0ZSA9IChyb3V0ZSkgPT4ge1xuICAgICAgICByZXR1cm4gcm91dGU7XG4gICAgfVxuXG4gICAgVXNlckxvZ291dCA9ICgpID0+IHtcbiAgICAgICAgYXV0aC5yZW1vdmVUb2tlbigpO1xuICAgIH1cbn1cblxuY29uc3QgaG9tZSA9IG5ldyBIb21lUGFnZSgpO1xuZXhwb3J0IGRlZmF1bHQgaG9tZTtcbiJdLCJzb3VyY2VSb290IjoiIn0=