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

var _homepage = __webpack_require__(/*! ../utils/homepage */ "./src/utils/homepage.js");

var _homepage2 = _interopRequireDefault(_homepage);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL2xvZ2luLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2F1dGguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2hvbWVwYWdlLmpzIl0sIm5hbWVzIjpbImhhbmRsZUxvZ2luIiwibG9naW4iLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImRhdGEiLCJ1c2VybmFtZSIsInZhbHVlIiwicGFzc3dvcmQiLCJhcGkiLCJwb3N0IiwidGhlbiIsInJlcyIsImpzb24iLCJjYXRjaCIsImNvbnNvbGUiLCJlcnJvciIsIm1lc3NhZ2UiLCJzdGF0dXMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiYXV0aCIsInNldFRva2VuIiwiYWNjZXNzX3Rva2VuIiwicmVkaXJlY3QiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInJlcGxhY2UiLCJlcnIiLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsInBhZGRpbmciLCJjb2xvciIsImlubmVySFRNTCIsIkFwaSIsImJhc2VVcmwiLCJlbmRwb2ludCIsInRva2VuIiwiZmV0Y2giLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImhlYWRlcnMiLCJBY2NlcHQiLCJBdXRob3JpemF0aW9uIiwiQXV0aGVudGljYXRpb24iLCJVc2VySXNMb2dnZWRJbiIsInNlY3JldGtleSIsImdldFRva2VuIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsImdldEl0ZW0iLCJyZW1vdmVUb2tlbiIsInJlbW92ZUl0ZW0iLCJsb2dPdXQiLCJlbGVtZW50IiwibG9nb3V0IiwiSG9tZVBhZ2UiLCJHZXRQcm90ZWN0ZWRSb3V0ZSIsInJvdXRlIiwiVXNlckxvZ291dCIsImhvbWUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLGNBQWMsU0FBZEEsV0FBYyxHQUFNO0FBQ3RCQyxVQUFNQyxnQkFBTixDQUF1QixPQUF2QixFQUFnQyxpQkFBUztBQUNyQ0MsY0FBTUMsY0FBTjs7QUFFQSxZQUFNQyxPQUFPO0FBQ1RDLHNCQUFVQSxTQUFTQyxLQURWO0FBRVRDLHNCQUFVQSxTQUFTRDtBQUZWLFNBQWI7O0FBS0FFLHNCQUFJQyxJQUFKLENBQVMsYUFBVCxFQUF3QkwsSUFBeEIsRUFDS00sSUFETCxDQUNVO0FBQUEsbUJBQU9DLElBQUlDLElBQUosRUFBUDtBQUFBLFNBRFYsRUFFS0MsS0FGTCxDQUVXO0FBQUEsbUJBQVNDLFFBQVFDLEtBQVIsQ0FBYyxXQUFXQSxLQUF6QixDQUFUO0FBQUEsU0FGWCxFQUdLTCxJQUhMLENBR1UsZ0JBQVE7QUFDVixnQkFBSU4sS0FBS1ksT0FBTCxLQUFpQix3QkFBckIsRUFBK0M7QUFDM0Msb0JBQUlDLFNBQVNDLFNBQVNDLGNBQVQsQ0FBd0IsU0FBeEIsQ0FBYjtBQUNBQywrQkFBS0MsUUFBTCxDQUFjakIsS0FBS2tCLFlBQW5CO0FBQ0FDLDBCQUFVQyxPQUFPQyxRQUFQLENBQWdCQyxPQUFoQixDQUF3QixZQUF4QjtBQUNiLGFBSkQsTUFJTztBQUNILG9CQUFJQyxNQUFNVCxTQUFTQyxjQUFULENBQXdCLFNBQXhCLENBQVY7QUFDQVEsb0JBQUlDLEtBQUosQ0FBVUMsZUFBVixHQUE0QixTQUE1QjtBQUNBRixvQkFBSUMsS0FBSixDQUFVRSxPQUFWLEdBQW9CLEtBQXBCO0FBQ0FILG9CQUFJQyxLQUFKLENBQVVHLEtBQVYsR0FBa0IsS0FBbEI7QUFDQUosb0JBQUlLLFNBQUosR0FBZ0I1QixLQUFLWSxPQUFyQjtBQUNIO0FBQ0osU0FmTDtBQWdCSCxLQXhCRDtBQXlCSCxDQTFCRDs7QUE0QkFqQixjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDaENNa0MsRztBQUNGLG1CQUFjO0FBQUE7O0FBQ1YsYUFBS0MsT0FBTCxHQUFlLDhCQUFmO0FBQ0g7Ozs7NkJBRUlDLFEsRUFBVS9CLEksRUFBb0I7QUFBQSxnQkFBZGdDLEtBQWMsdUVBQU4sSUFBTTs7QUFDL0IsbUJBQU9DLFdBQVMsS0FBS0gsT0FBZCxHQUF3QkMsUUFBeEIsRUFBb0M7QUFDdkNHLHdCQUFRLE1BRCtCO0FBRXZDQyxzQkFBTUMsS0FBS0MsU0FBTCxDQUFlckMsSUFBZixDQUZpQztBQUd2Q3NDLHlCQUFTO0FBQ0xDLDRCQUFRLGtCQURIO0FBRUxDLCtDQUF5QlIsS0FGcEI7QUFHTCxvQ0FBZ0I7QUFIWDtBQUg4QixhQUFwQyxDQUFQO0FBU0g7Ozs0QkFFR0QsUSxFQUFVQyxLLEVBQU87QUFDakIsbUJBQU9DLFdBQVMsS0FBS0gsT0FBZCxHQUF3QkMsUUFBeEIsRUFBb0M7QUFDdkNHLHdCQUFRLEtBRCtCO0FBRXZDSSx5QkFBUztBQUNMRSwrQ0FBeUJSLEtBRHBCO0FBRUwsb0NBQWdCO0FBRlg7QUFGOEIsYUFBcEMsQ0FBUDtBQU9IOzs7Ozs7QUFHTCxJQUFNNUIsTUFBTSxJQUFJeUIsR0FBSixFQUFaO2tCQUNlekIsRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUM3QlRxQyxjOzs7OztTQUVGQyxjLEdBQWlCLFlBQU07QUFDbkIsWUFBTUMsWUFBWSxNQUFLQyxRQUFMLEVBQWxCO0FBQ0EsWUFBSUQsY0FBYyxJQUFkLElBQXNCQSxjQUFjLFdBQXhDLEVBQXFEO0FBQ2pELG1CQUFPLEtBQVA7QUFDSDtBQUNELGVBQU8sSUFBUDtBQUNILEs7O1NBQ0QxQixRLEdBQVcsVUFBQ2UsS0FBRCxFQUFXO0FBQ2xCLGVBQU9hLGFBQWFDLE9BQWIsQ0FBcUIsY0FBckIsRUFBcUNkLEtBQXJDLENBQVA7QUFDSCxLOztTQUVEWSxRLEdBQVcsWUFBTTtBQUNiLGVBQU9DLGFBQWFFLE9BQWIsQ0FBcUIsY0FBckIsQ0FBUDtBQUNILEs7O1NBRURDLFcsR0FBYyxZQUFNO0FBQ2hCLGVBQU9ILGFBQWFJLFVBQWIsQ0FBd0IsY0FBeEIsQ0FBUDtBQUNILEs7O1NBRURDLE0sR0FBUyxZQUFNO0FBQ1gsWUFBSUMsVUFBVXJDLFNBQVNDLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBZDtBQUNBcUMsZUFBT3ZELGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLGlCQUFTO0FBQ3RDLGtCQUFLbUQsV0FBTDtBQUNBN0Isc0JBQVVDLE9BQU9DLFFBQVAsQ0FBZ0JDLE9BQWhCLENBQXdCLGFBQXhCO0FBQ2IsU0FIRDtBQUlILEs7OztBQUVMLElBQU1OLE9BQU8sSUFBSXlCLGNBQUosRUFBYjtrQkFDZXpCLEk7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlCZjs7Ozs7Ozs7SUFFTXFDLFE7OztTQUVGQyxpQixHQUFvQixVQUFDQyxLQUFELEVBQVc7QUFDM0IsZUFBT0EsS0FBUDtBQUNILEs7O1NBRURDLFUsR0FBYSxZQUFNO0FBQ2Z4Qyx1QkFBS2dDLFdBQUw7QUFDSCxLOzs7QUFHTCxJQUFNUyxPQUFPLElBQUlKLFFBQUosRUFBYjtrQkFDZUksSSIsImZpbGUiOiJzaWduaW4uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvcGFnZXMvbG9naW4uanNcIik7XG4iLCJpbXBvcnQgYXBpIGZyb20gXCIuLi91dGlscy9hcGlcIjtcbmltcG9ydCBhdXRoIGZyb20gXCIuLi91dGlscy9hdXRoXCI7XG5pbXBvcnQgaG9tZSBmcm9tIFwiLi4vdXRpbHMvaG9tZXBhZ2VcIjtcblxuY29uc3QgaGFuZGxlTG9naW4gPSAoKSA9PiB7XG4gICAgbG9naW4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50ID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lLnZhbHVlLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkLnZhbHVlXG4gICAgICAgIH07XG5cbiAgICAgICAgYXBpLnBvc3QoXCIvYXV0aC9sb2dpblwiLCBkYXRhKVxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcignRXJyb3IgJyArIGVycm9yKSlcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLm1lc3NhZ2UgPT09IFwiU3VjY2Vzc2Z1bGx5IGxvZ2dlZCBpblwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzdGF0dXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVzc2FnZScpXG4gICAgICAgICAgICAgICAgICAgIGF1dGguc2V0VG9rZW4oZGF0YS5hY2Nlc3NfdG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICByZWRpcmVjdDogd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoXCIvcXVlc3Rpb25zXCIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBlcnIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVzc2FnZScpXG4gICAgICAgICAgICAgICAgICAgIGVyci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNGQ0RGREZcIjtcbiAgICAgICAgICAgICAgICAgICAgZXJyLnN0eWxlLnBhZGRpbmcgPSBcIjhweFwiO1xuICAgICAgICAgICAgICAgICAgICBlcnIuc3R5bGUuY29sb3IgPSBcInJlZFwiO1xuICAgICAgICAgICAgICAgICAgICBlcnIuaW5uZXJIVE1MID0gZGF0YS5tZXNzYWdlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5oYW5kbGVMb2dpbigpO1xuIiwiY2xhc3MgQXBpIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5iYXNlVXJsID0gXCJodHRwOi8vMTI3LjAuMC4xOjUwMDAvYXBpL3YyXCI7XG4gICAgfVxuXG4gICAgcG9zdChlbmRwb2ludCwgZGF0YSwgdG9rZW4gPSBudWxsKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChgJHt0aGlzLmJhc2VVcmx9JHtlbmRwb2ludH1gLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWAsXG4gICAgICAgICAgICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0KGVuZHBvaW50LCB0b2tlbikge1xuICAgICAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5iYXNlVXJsfSR7ZW5kcG9pbnR9YCwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gLFxuICAgICAgICAgICAgICAgIFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuY29uc3QgYXBpID0gbmV3IEFwaSgpO1xuZXhwb3J0IGRlZmF1bHQgYXBpO1xuIiwiY2xhc3MgQXV0aGVudGljYXRpb24ge1xuXG4gICAgVXNlcklzTG9nZ2VkSW4gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNlY3JldGtleSA9IHRoaXMuZ2V0VG9rZW4oKVxuICAgICAgICBpZiAoc2VjcmV0a2V5ID09PSBudWxsIHx8IHNlY3JldGtleSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgc2V0VG9rZW4gPSAodG9rZW4pID0+IHtcbiAgICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhY2Nlc3NfdG9rZW4nLCB0b2tlbik7XG4gICAgfVxuXG4gICAgZ2V0VG9rZW4gPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWNjZXNzX3Rva2VuJyk7XG4gICAgfVxuXG4gICAgcmVtb3ZlVG9rZW4gPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnYWNjZXNzX3Rva2VuJyk7XG4gICAgfVxuXG4gICAgbG9nT3V0ID0gKCkgPT4ge1xuICAgICAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9nb3V0XCIpO1xuICAgICAgICBsb2dvdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlVG9rZW4oKTtcbiAgICAgICAgICAgIHJlZGlyZWN0OiB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShcIi9hdXRoL2xvZ2luXCIpO1xuICAgICAgICB9KVxuICAgIH1cbn1cbmNvbnN0IGF1dGggPSBuZXcgQXV0aGVudGljYXRpb24oKTtcbmV4cG9ydCBkZWZhdWx0IGF1dGg7IiwiaW1wb3J0IGF1dGggZnJvbSBcIi4uL3V0aWxzL2F1dGhcIjtcblxuY2xhc3MgSG9tZVBhZ2Uge1xuXG4gICAgR2V0UHJvdGVjdGVkUm91dGUgPSAocm91dGUpID0+IHtcbiAgICAgICAgcmV0dXJuIHJvdXRlO1xuICAgIH1cblxuICAgIFVzZXJMb2dvdXQgPSAoKSA9PiB7XG4gICAgICAgIGF1dGgucmVtb3ZlVG9rZW4oKTtcbiAgICB9XG59XG5cbmNvbnN0IGhvbWUgPSBuZXcgSG9tZVBhZ2UoKTtcbmV4cG9ydCBkZWZhdWx0IGhvbWU7XG4iXSwic291cmNlUm9vdCI6IiJ9