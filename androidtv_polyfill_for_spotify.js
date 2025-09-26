// androidtv_polyfill_for_spotify.js
(function () {
  console.log("[android_polyfill] installing...");

  if (!window.androidTvGlobalObject) {
    window.androidTvGlobalObject = {};
  }

  // Fake system object to prevent crashes in spotifytv.js
  if (!window.androidTvGlobalObject.system) {
    window.androidTvGlobalObject.system = {
      setScreenSaver: function (enable) {
        console.log("[android_polyfill] setScreenSaver called with", enable);
        return true;
      },
      hasSystemFeature: function (feature) {
        console.log("[android_polyfill] hasSystemFeature check:", feature);
        return true;
      },
      getProperty: function (prop) {
        console.log("[android_polyfill] getProperty:", prop);
        return "stub";
      }
    };
  }

  // Basic fake properties for Android TV device
  window.androidTvGlobalObject.osVersion = "11.0.0";
  window.androidTvGlobalObject.model = "AndroidTV-Dev";
  window.androidTvGlobalObject.manufacturer = "Polyfill Inc.";
  window.androidTvGlobalObject.serial = "0000-DEV";
  window.androidTvGlobalObject.device = "androidtv";

  // Add a dummy g object if spotifytv.js expects it
  if (!window.androidTvGlobalObject.g) {
    window.androidTvGlobalObject.g = window;
  }

  console.log(
    "[android_polyfill] ready, osVersion:",
    window.androidTvGlobalObject.osVersion,
    "model:",
    window.androidTvGlobalObject.model
  );
})();
