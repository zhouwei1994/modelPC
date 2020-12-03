let lastTime = 0;
const config = {};
const vendors = ['webkit', 'moz'];
for (let x = 0; x < vendors.length && !config.requestAnimationFrame; ++x) {
  config.requestAnimationFrame = config[vendors[x] + 'RequestAnimationFrame'];
  config.cancelAnimationFrame = config[vendors[x] + 'CancelAnimationFrame'] || config[vendors[x] + 'CancelRequestAnimationFrame'];
}

if (!config.requestAnimationFrame) {
  config.requestAnimationFrame = function (callback) {
    const currTime = new Date().getTime();
    const timeToCall = Math.max(0, 16 - (currTime - lastTime));
    const id = setTimeout(function () {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
}
if (!config.cancelAnimationFrame) {
  config.cancelAnimationFrame = function (id) {
    clearTimeout(id);
  };
}