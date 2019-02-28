import {
  getStyle
} from '@/config/mUtils'

function onRipple(el, time, event) {
  let e = event || window.event;
  let className = el.className;
  if (className) {
    if (!/ripple/g.test(className)) {
      el.className = el.className + ' ripple';
    }
  } else {
    el.className = ' ripple';
  }
  let elementWidth = el.offsetWidth;
  let elementHeight = el.offsetHeight;
  let elementLength = 0;
  if (elementWidth > elementHeight) {
    elementLength = elementWidth;
  } else {
    elementLength = elementHeight;
  }
  let elementTop = el.offsetTop;
  let elementLeft = el.offsetLeft;
  let addElementTop = (e.clientY - elementTop);
  let addElementLeft = (e.clientX - elementLeft);
  var appSpan = document.createElement('span');
  appSpan.className = 'rippleSpan';

  var frequency = parseInt(time / 25);
  var eachMobileWidth = parseInt(elementLength * 1.7 / frequency);
  var eachMobileTop = parseInt((addElementTop + (elementLength * 1.7 / 2 - elementHeight / 2)) / frequency);
  var eachMobileLeft = parseInt((addElementLeft + (elementLength * 1.7 / 2 - elementWidth / 2)) / frequency);
  var eachMobileOpacity = 1 / frequency;
  var currentNum = 0;
  recursive();

  function recursive() {
    appSpan.setAttribute('style',
      'width: ' + currentNum * eachMobileWidth + 'px; ' +
      'height: ' + currentNum * eachMobileWidth + 'px; ' +
      'transform: translateX(' + (addElementLeft - eachMobileLeft * currentNum) + 'px) translateY(' + (addElementTop - eachMobileTop * currentNum) + 'px);'
      // 'opacity: ' + (1 - eachMobileOpacity * currentNum)
    );
    if (currentNum < frequency) {
      currentNum++;
      setTimeout(() => {
        recursive();
      }, 25);
    }
  }
  el.appendChild(appSpan);
  deletes(el, appSpan);

  function deletes(el, element) {
    setTimeout(() => {
      el.removeChild(element);
    }, time);
  }
}
export const ripple = {
  directives: {
    'ripple': {
      bind: (el, binding) => {
        el.addEventListener("click", function (event) {
          var time = 1000;
          onRipple(el, time, event);
        });
      }
    }
  }
};
