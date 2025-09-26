console.log("[android_polyfill] installing...");

// create the AndroidTV global object
window.androidTvGlobalObject = window.androidTvGlobalObject || {};
var atg = window.androidTvGlobalObject;

// --- system emulation ---
atg.system = atg.system || {};
atg.system.setScreenSaver = function () {
  console.log("[android_polyfill] system.setScreenSaver called");
};
atg.system.getSystemProperty = function (prop) {
  console.log("[android_polyfill] system.getSystemProperty:", prop);
  return "";
};
atg.system.hasSystemFeature = function (f) {
  console.log("[android_polyfill] system.hasSystemFeature:", f);
  return false;
};
atg.system.getMaximumVideoHeight = function () {
  return 1080;
};
atg.system.getMaximumVideoWidth = function () {
  return 1920;
};
atg.system.localDiscoveryEnabled = function () {
  return false;
};
atg.system.getLastRememberMeInfo = function () {
  return "{}";
};

// --- SpBridge emulation ---
atg.SpBridge = atg.SpBridge || {};
atg.SpBridge.addEventListener = function (e, cb) {
  console.log("[android_polyfill] SpBridge.addEventListener:", e);
};
atg.SpBridge.removeEventListener = function (e, cb) {
  console.log("[android_polyfill] SpBridge.removeEventListener:", e);
};
atg.SpBridge.dispatchEvent = function (evt) {
  console.log("[android_polyfill] SpBridge.dispatchEvent:", evt);
};
atg.SpBridge.closeApplication = function () {
  console.log("[android_polyfill] SpBridge.closeApplication called");
};

// --- esdk event hooks ---
atg.esdkEvent = atg.esdkEvent || {};
atg.esdkEvent.onEsdkMessage = function (msg) {
  console.log("[android_polyfill] esdkEvent.onEsdkMessage:", msg);
};
atg.connectionChange = atg.connectionChange || {};
atg.connectionChange.onConnectionChange = function (status) {
  console.log("[android_polyfill] connectionChange.onConnectionChange:", status);
};

// --- key/osk emulation ---
atg.androidKeyEvent = atg.androidKeyEvent || {};
atg.androidKeyEvent.onKeyDown = function (keyCode) {
  console.log("[android_polyfill] androidKeyEvent.onKeyDown:", keyCode);
};
atg.androidKeyEvent.onKeyUp = function (keyCode) {
  console.log("[android_polyfill] androidKeyEvent.onKeyUp:", keyCode);
};
atg.oskEvent = atg.oskEvent || {};
atg.oskEvent.onOskClosed = function () {
  console.log("[android_polyfill] oskEvent.onOskClosed");
};

// --- navigator/document/window passthrough ---
atg.navigator = window.navigator;
atg.document = window.document;
atg.window = window;

// mark ready
console.log(
  "[android_polyfill] ready, osVersion: 11.0.0 model: AndroidTV-Dev"
);

// --- start: compatibility bridge for bundles using window as platform ---
(function () {
  var globalObj = window;
  globalObj.system = globalObj.system || atg.system;
  globalObj.SpBridge = globalObj.SpBridge || atg.SpBridge;
  globalObj.esdkEvent = globalObj.esdkEvent || atg.esdkEvent;
  globalObj.connectionChange =
    globalObj.connectionChange || atg.connectionChange;
  globalObj.androidKeyEvent =
    globalObj.androidKeyEvent || atg.androidKeyEvent;
  globalObj.oskEvent = globalObj.oskEvent || atg.oskEvent;
  globalObj.navigator = globalObj.navigator || atg.navigator;
  globalObj.document = globalObj.document || atg.document;
  globalObj.window = globalObj.window || atg.window;
})();
// --- end: compatibility bridge ---
