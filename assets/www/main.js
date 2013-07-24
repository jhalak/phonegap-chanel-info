require.config({
  shim:{
    'angular':{ deps:['jquery'], exports:'angular'}
  }
});
function tryHoldReady() {
  if (!tryHoldReady.executed && window.jQuery) {
    window.jQuery.holdReady(true);
    tryHoldReady.executed = true;
  }
}
tryHoldReady();
require.onResourceLoad = tryHoldReady;
require([
  "jquery",
  "jquery-mobile-angular-adapter",
  "channel-info"
], function (jquery) {
  jquery.holdReady(false);
});