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
            /* let message = document.getElementById('message')
             message.style.backgroundColor = "#F0FAEE";
             message.style.padding = "8px";
             message.style.color = "#259814";
             message.innerHTML = data.message;*/
            redirect: window.location.replace("../../templates/mains/home.html");
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
        var token = _this.getToken();
        if (token == null || 'undefined') {
            return false;
        } else {
            return true;
        }
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
        logout.addEventListener("click", function (event) {
            removeToken();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL3NpZ251cC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvYXBpLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9hdXRoLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9ob21lcGFnZS5qcyJdLCJuYW1lcyI6WyJyZWdpc3RlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiZGF0YSIsIm5hbWUiLCJmdWxsbmFtZSIsInZhbHVlIiwidXNlcm5hbWUiLCJlbWFpbCIsInBhc3N3b3JkIiwiYXBpIiwicG9zdCIsInRoZW4iLCJyZXMiLCJqc29uIiwiY2F0Y2giLCJjb25zb2xlIiwiZXJyb3IiLCJtZXNzYWdlIiwiYXV0aCIsInNldFRva2VuIiwiYWNjZXNzX3Rva2VuIiwicmVkaXJlY3QiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInJlcGxhY2UiLCJlcnIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwia2V5Iiwic3R5bGUiLCJkaXNwbGF5IiwiYmFja2dyb3VuZENvbG9yIiwicGFkZGluZyIsImNvbG9yIiwiaW5uZXJIVE1MIiwicmVsb2FkIiwiQXBpIiwiYmFzZVVybCIsImVuZHBvaW50IiwidG9rZW4iLCJmZXRjaCIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiaGVhZGVycyIsIkFjY2VwdCIsIkF1dGhvcml6YXRpb24iLCJBdXRoZW50aWNhdGlvbiIsIlVzZXJJc0xvZ2dlZEluIiwiZ2V0VG9rZW4iLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiZ2V0SXRlbSIsInJlbW92ZVRva2VuIiwicmVtb3ZlSXRlbSIsImxvZ091dCIsImxvZ291dCIsIkhvbWVQYWdlIiwiR2V0UHJvdGVjdGVkUm91dGUiLCJyb3V0ZSIsIlVzZXJMb2dvdXQiLCJob21lIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7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R0FBYSxZQUFNO0FBQ2YzQyx1QkFBS29DLFdBQUw7QUFDSCxLOzs7QUFHTCxJQUFNUSxPQUFPLElBQUlKLFFBQUosRUFBYjtrQkFDZUksSSIsImZpbGUiOiJzaWdudXAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvcGFnZXMvc2lnbnVwLmpzXCIpO1xuIiwiaW1wb3J0IGFwaSBmcm9tIFwiLi4vdXRpbHMvYXBpXCI7XG5pbXBvcnQgYXV0aCBmcm9tIFwiLi4vdXRpbHMvYXV0aFwiO1xuaW1wb3J0IGhvbWUgZnJvbSBcIi4uL3V0aWxzL2hvbWVwYWdlXCI7XG5cbnJlZ2lzdGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudCA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIG5hbWU6IGZ1bGxuYW1lLnZhbHVlLFxuICAgICAgICB1c2VybmFtZTogdXNlcm5hbWUudmFsdWUsXG4gICAgICAgIGVtYWlsOiBlbWFpbC52YWx1ZSxcbiAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkLnZhbHVlXG4gICAgfTtcblxuICAgIGFwaVxuICAgICAgICAucG9zdChcIi9hdXRoL3JlZ2lzdGVyXCIsIGRhdGEpXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcignRXJyb3IgJysgZXJyb3IpKVxuICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGlmIChkYXRhLm1lc3NhZ2UgPT09IFwiVXNlciBjcmVhdGVkIHN1Y2Nlc3NmdWxseVwiKSB7XG4gICAgICAgICAgICAgICAgYXV0aC5zZXRUb2tlbihkYXRhLmFjY2Vzc190b2tlbik7XG4gICAgICAgICAgICAgICAvKiBsZXQgbWVzc2FnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZXNzYWdlJylcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiI0YwRkFFRVwiO1xuICAgICAgICAgICAgICAgIG1lc3NhZ2Uuc3R5bGUucGFkZGluZyA9IFwiOHB4XCI7XG4gICAgICAgICAgICAgICAgbWVzc2FnZS5zdHlsZS5jb2xvciA9IFwiIzI1OTgxNFwiO1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UuaW5uZXJIVE1MID0gZGF0YS5tZXNzYWdlOyovXG4gICAgICAgICAgICAgICAgcmVkaXJlY3Q6IHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKFwiLi4vLi4vdGVtcGxhdGVzL21haW5zL2hvbWUuaHRtbFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEubWVzc2FnZSAhPT0gXCJVc2VyIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5XCIpIHtcbiAgICAgICAgICAgICAgICBsZXQgZXJyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lc3NhZ2UnKVxuICAgICAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiBkYXRhLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG4gICAgICAgICAgICAgICAgICAgIGVyci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNGQ0RGREZcIjtcbiAgICAgICAgICAgICAgICAgICAgZXJyLnN0eWxlLnBhZGRpbmcgPSBcIjhweFwiO1xuICAgICAgICAgICAgICAgICAgICBlcnIuc3R5bGUuY29sb3IgPSBcInJlZFwiO1xuICAgICAgICAgICAgICAgICAgICBlcnIuaW5uZXJIVE1MID0gZGF0YS5tZXNzYWdlW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG59KTtcbiIsImNsYXNzIEFwaSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYmFzZVVybCA9IFwiaHR0cDovLzEyNy4wLjAuMTo1MDAwL2FwaS92MlwiO1xuICAgIH1cblxuICAgIHBvc3QoZW5kcG9pbnQsIGRhdGEsIHRva2VuID0gbnVsbCkge1xuICAgICAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5iYXNlVXJsfSR7ZW5kcG9pbnR9YCwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gLFxuICAgICAgICAgICAgICAgIFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldChlbmRwb2ludCwgdG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke3RoaXMuYmFzZVVybH0ke2VuZHBvaW50fWAsIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dG9rZW59YCxcbiAgICAgICAgICAgICAgICBcImNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmNvbnN0IGFwaSA9IG5ldyBBcGkoKTtcbmV4cG9ydCBkZWZhdWx0IGFwaTtcbiIsImNsYXNzIEF1dGhlbnRpY2F0aW9uIHtcblxuICAgIFVzZXJJc0xvZ2dlZEluID0gKCkgPT4ge1xuICAgICAgICBjb25zdCB0b2tlbiA9IHRoaXMuZ2V0VG9rZW4oKVxuICAgICAgICBpZiAodG9rZW4gPT0gbnVsbCB8fCAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0VG9rZW4gPSAodG9rZW4pID0+IHtcbiAgICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhY2Nlc3NfdG9rZW4nLCB0b2tlbik7XG4gICAgfVxuXG4gICAgZ2V0VG9rZW4gPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWNjZXNzX3Rva2VuJyk7XG4gICAgfVxuXG4gICAgcmVtb3ZlVG9rZW4gPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnYWNjZXNzX3Rva2VuJyk7XG4gICAgfVxuXG4gICAgbG9nT3V0ID0gKCkgPT4ge1xuICAgICAgICBsb2dvdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHJlbW92ZVRva2VuKCk7XG4gICAgICAgICAgICByZWRpcmVjdDogd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoXCIuLi8uLi90ZW1wbGF0ZXMvbWFpbnMvc2lnbmluLmh0bWxcIik7XG4gICAgICAgIH0pXG4gICAgfVxufVxuY29uc3QgYXV0aCA9IG5ldyBBdXRoZW50aWNhdGlvbigpO1xuZXhwb3J0IGRlZmF1bHQgYXV0aDtcbiIsImltcG9ydCBhdXRoIGZyb20gXCIuLi91dGlscy9hdXRoXCI7XG5cbmNsYXNzIEhvbWVQYWdlIHtcblxuICAgIEdldFByb3RlY3RlZFJvdXRlID0gKHJvdXRlKSA9PiB7XG4gICAgICAgIHJldHVybiByb3V0ZTtcbiAgICB9XG5cbiAgICBVc2VyTG9nb3V0ID0gKCkgPT4ge1xuICAgICAgICBhdXRoLnJlbW92ZVRva2VuKCk7XG4gICAgfVxufVxuXG5jb25zdCBob21lID0gbmV3IEhvbWVQYWdlKCk7XG5leHBvcnQgZGVmYXVsdCBob21lO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==