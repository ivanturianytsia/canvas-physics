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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/ball.js":
/*!************************!*\
  !*** ./src/js/ball.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\nfunction Ball(radius, color) {\n  // Base\n  var ball = this;\n\n  // Specifications\n  ball.r = radius || 10; // ball radius\n  ball.c = color || 'red'; // ball color\n  ball.x = 0; // center x\n  ball.y = 0; // center y\n  ball.m = 0; // mass\n  ball.vx = 0; // velocity of x direction of ball\n  ball.vy = 0; // velocity of y direction of ball\n  ball.context = null; // the drawing context of ball\n}\n\nBall.prototype.draw = function () {\n  // Base\n  var ball = this;\n\n  // Check Context\n  if (!ball.context) {\n    return;\n  }\n\n  // Draw Ball\n  ball.context.beginPath();\n  ball.context.fillStyle = ball.c;\n  ball.context.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);\n  ball.context.fill();\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Ball);\n\n//# sourceURL=webpack:///./src/js/ball.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_ball_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/ball.js */ \"./src/js/ball.js\");\n\n\nwindow.onload = function () {\n\n  // Definitions\n  var canvas = document.getElementById(\"momentum-one-axis-canvas\");\n  var context = canvas.getContext(\"2d\");\n\n  var minr = 50;\n  var maxr = 100;\n  var v = 5;\n  var n = 10;\n\n  window.requestAnimationFrame(animationLoop);\n\n  balls = init();\n\n  function init() {\n    var balls = [];\n\n    for (var i = 0; i < n; i++) {\n      var radius = randInt(minr, maxr);\n      var ball = new _js_ball_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](radius);\n\n      ball.x = randInt(radius, canvas.width - radius);\n      ball.y = randInt(radius, canvas.height - radius);\n\n      // for ()\n\n      ball.m = radius;\n      ball.vx = randInt(0, 2 * v) - v;\n      ball.vy = randInt(0, 2 * v) - v;\n\n      ball.context = context;\n      ball.draw();\n\n      balls.push(ball);\n    }\n\n    return balls;\n  }\n\n  function animationLoop() {\n    // Clear Canvas\n    context.clearRect(0, 0, canvas.width, canvas.height);\n\n    moveBalls();\n\n    checkBallCollisions();\n\n    drawBalls();\n\n    // Animate\n    window.requestAnimationFrame(animationLoop);\n  }\n\n  function move(ball) {\n    // ball.vy += 0.098\n    ball.x += ball.vx;\n    ball.y += ball.vy;\n\n    checkEdges(ball);\n  }\n\n  function moveBalls() {\n    for (var i = 0; i < balls.length; i++) {\n      move(balls[i]);\n    }\n  }\n  function drawBalls() {\n    for (var i = 0; i < balls.length; i++) {\n      balls[i].draw();\n    }\n  }\n\n  function checkEdges(ball) {\n    // Detect Edge Collisions\n    if (ball.x + ball.r > canvas.width) {\n      ball.vx = -1 * Math.abs(ball.vx);\n    }\n    if (ball.x - ball.r < 0) {\n      ball.vx = Math.abs(ball.vx);\n    }\n\n    if (ball.y + ball.r > canvas.height) {\n      ball.vy = -1 * Math.abs(ball.vy);\n    }\n    if (ball.y - ball.r < 0) {\n      ball.vy = Math.abs(ball.vy);\n    }\n  }\n\n  function isCollided(ball, other) {\n    return ball !== other && Math.pow(Math.pow(ball.x - other.x, 2) + Math.pow(ball.y - other.y, 2), 1 / 2) < ball.r + other.r;\n  }\n\n  function checkBallCollisions() {\n    for (var i = 0; i < balls.length; i++) {\n      var ball = balls[i];\n      for (var j = i; j < n; j++) {\n        var other = balls[j];\n        if (isCollided(ball, other)) {\n          // New Velocity of Ball 1 After Collision\n          var x1 = (ball.m - other.m) * ball.vx / (ball.m + other.m);\n          x1 += 2 * other.m * other.vx / (ball.m + other.m);\n\n          // New Velocity of Ball 2 After Collision\n          var x2 = (other.m - ball.m) * other.vx / (other.m + ball.m);\n          x2 += 2 * ball.m * ball.vx / (ball.m + other.m);\n\n          ball.vx = x1;\n          other.vx = x2;\n\n          var y1 = (ball.m - other.m) * ball.vy / (ball.m + other.m);\n          y1 += 2 * other.m * other.vy / (ball.m + other.m);\n\n          // New Velocity of Ball 2 After Collision\n          var y2 = (other.m - ball.m) * other.vy / (other.m + ball.m);\n          y2 += 2 * ball.m * ball.vy / (ball.m + other.m);\n\n          ball.vy = y1;\n          other.vy = y2;\n        }\n      }\n    }\n  }\n\n  window.requestAnimationFrame = function () {\n    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {\n      window.setTimeout(callback, 1000 / 60);\n    };\n  }();\n};\n\nfunction randInt(min, max) {\n  return min + Math.random() * (max - min);\n}\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/main.js */\"./src/main.js\");\n\n\n//# sourceURL=webpack:///multi_./src/main.js?");

/***/ })

/******/ });