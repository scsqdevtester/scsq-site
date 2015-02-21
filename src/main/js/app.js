/* app.js */

// Fails in headless test (without Karma), because window is not defined
var myNamespace = window.myNamespace || {};

// Works in headless test
//var myNamespace = {};