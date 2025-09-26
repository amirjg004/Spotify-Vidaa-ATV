// androidtv_polyfill_for_spotify.js
console.log("[polyfill] installing AndroidTV stubs...");

window.androidTvGlobalObject = {
  system: {
    setScreenSaver: function (enabled) {
      console.log("[polyfill] setScreenSaver called with:", enabled);
      return true;
    },
    hasSystemFeature: function (feature) {
      console.log("[polyfill] hasSystemFeature called with:", feature);
      // بزار همیشه true برگردونه
      return true;
    }
  },
  // اگه قسمت‌های دیگه لازم داشت اضافه می‌کنیم
};

console.log("[polyfill] AndroidTV stubs ready");
