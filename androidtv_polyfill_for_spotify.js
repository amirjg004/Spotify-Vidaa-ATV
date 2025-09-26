// androidtv_polyfill_for_spotify.js
// Lightweight Android TV polyfill for running Spotify's androidtv bundle in a desktop browser for testing.
// Drop this file into the same folder as spotifytv.js and vendors.*.js and include it BEFORE spotifytv.js
(function(){
  if (window.androidTvGlobalObject && window.androidTvGlobalObject._spotify_polyfilled) {
    console.log('[android_polyfill] already installed');
    return;
  }

  console.log('[android_polyfill] installing...');

  window.androidTvGlobalObject = window.androidTvGlobalObject || {};
  var atg = window.androidTvGlobalObject;

  // Mark so we don't overwrite on repeated loads
  atg._spotify_polyfilled = true;

  // Document / window / navigator passthrough (so spotify code can use androidTvGlobalObject.document etc)
  atg.document = atg.document || window.document;
  atg.window = atg.window || window.window || window;
  atg.navigator = atg.navigator || window.navigator;

  // Minimal SpBridge stub used by transport.execute calls
  atg.SpBridge = atg.SpBridge || {
    execute: function() {
      console.log('[android_polyfill] SpBridge.execute called with', arguments);
      // many apps use the bridge only as a signaling mechanism during dev; return undefined
    }
  };

  // ESDK / event callback hook (transport will set this later)
  atg.esdkEvent = atg.esdkEvent || function() {
    console.log('[android_polyfill] esdkEvent', arguments);
  };

  // Connection change hook placeholder (set by platform if needed)
  atg.connectionChange = atg.connectionChange || function(state){ console.log('[android_polyfill] connectionChange', state); };

  // Keyboard/OSK placeholders (set by platform setup code)
  atg.androidKeyEvent = atg.androidKeyEvent || function(){ /* no-op */ };
  atg.oskEvent = atg.oskEvent || function(){ /* no-op */ };

  // Minimal system API used by spotifytv.js on AndroidTV
  atg.system = atg.system || {};

  // setScreenSaver(flag) is used to turn screensaver suppression on/off
  atg.system.setScreenSaver = atg.system.setScreenSaver || function(enabled){
    try { console.log('[android_polyfill] setScreenSaver ->', !!enabled); } catch(e){}
  };

  // hasSystemFeature(feature) -> boolean. Return false for unknown features.
  atg.system.hasSystemFeature = atg.system.hasSystemFeature || function(feature){
    // You can tweak these if you want the app to behave as a specific device
    if (!feature) return false;
    var f = String(feature).toLowerCase();
    if (f.indexOf('amazon.hardware.fire_tv') !== -1) return false;
    if (f.indexOf('android.hardware.ram.low') !== -1) return false;
    return false;
  };

  atg.system.localDiscoveryEnabled = atg.system.localDiscoveryEnabled || function(){
    return false;
  };

  // Last-remember-me storage blob (if your dev container supports it, return a JSON string here)
  atg.system.getLastRememberMeInfo = atg.system.getLastRememberMeInfo || function(){
    return null;
  };

  atg.system.getModelName = atg.system.getModelName || function(){
    return 'AndroidTV-Dev';
  };

  atg.system.getBrandName = atg.system.getBrandName || function(){
    return 'Generic';
  };

  atg.system.getDeviceId = atg.system.getDeviceId || function(){
    return 'dev-device-id';
  };

  atg.system.getContainerInternalVersionName = atg.system.getContainerInternalVersionName || function(){
    return 'dev-container-1.0.0';
  };

  // Playback-related video capability queries (keep conservative defaults)
  atg.system.getMaximumVideoHeight = atg.system.getMaximumVideoHeight || function(profile){
    // return the max supported height for the given profile (e.g. 'video/avc')
    return 1080;
  };

  atg.system.getMaximumVideoWidthFor = atg.system.getMaximumVideoWidthFor || function(profile, height){
    return 1920;
  };

  // Intent/voice/assistant hooks - spotify's code will replace these with real callbacks on real devices
  atg.system.executeIntent = atg.system.executeIntent || function(uri){ console.log('[android_polyfill] executeIntent', uri); };
  atg.system.voiceIntent = atg.system.voiceIntent || function(obj){ console.log('[android_polyfill] voiceIntent', obj); };
  atg.system.notifyVoiceAssistant = atg.system.notifyVoiceAssistant || function(payload){ console.log('[android_polyfill] notifyVoiceAssistant', payload); };
  atg.system.exitApplication = atg.system.exitApplication || function(){ console.log('[android_polyfill] exitApplication'); };

  // Provide a fallback user-agent string if not present (spotify uses navigator.userAgent)
  if (!atg.navigator.userAgent) {
    atg.navigator.userAgent = navigator.userAgent || 'Mozilla/5.0 (Linux; Android 9; AndroidTV-Dev) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36';
  }

  // Ensure window.focus exists on the polyfilled wrapper
  if (typeof atg.window.focus !== 'function') {
    atg.window.focus = function(){ try { window.focus(); } catch(e){} };
  }

  // document event wiring - keep the same document instance so addEventListener/onkeydown behave as expected
  try {
    atg.document.addEventListener = atg.document.addEventListener.bind(document);
    atg.document.removeEventListener = atg.document.removeEventListener.bind(document);
    atg.document.activeElement = document.activeElement;
    atg.document.onkeydown = atg.document.onkeydown || null;
    atg.document.onkeyup = atg.document.onkeyup || null;
  } catch (e) {
    // ignore binding errors in older environments
  }

  console.log('[android_polyfill] ready, osVersion:', (atg.navigator.userAgent||'').match(/android\s+([0-9a-z._-]+)/i) ? (atg.navigator.userAgent.match(/android\s+([0-9a-z._-]+)/i)||[])[1] : 'unknown', 'model:', atg.system.getModelName());
})();