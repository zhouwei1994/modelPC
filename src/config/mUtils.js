/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.sessionStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return;
  return window.sessionStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return;
  window.sessionStorage.removeItem(name);
}
/**
 * json数据去重合并
 */
export const modifyJson = (json, oldJson) => {
  if (!json && !oldJson) return;
  if (typeof json !== "object") {
    json = JSON.parse(json);
  }
  if (typeof oldJson !== "object") {
    oldJson = JSON.parse(oldJson);
  }

  var jsonData = {};
  for (var i in oldJson) {
    jsonData[i] = oldJson[i];
  }
  for (var j in json) {
    jsonData[j] = json[j];
  }

  return jsonData;
}
/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
  let target;
  // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
  if (attr === 'scrollTop') {
    target = element.scrollTop;
  } else if (element.currentStyle) {
    target = element.currentStyle[attr];
  } else {
    target = document.defaultView.getComputedStyle(element, null)[attr];
  }
  //在获取 opactiy 时需要获取小数 parseFloat
  return NumberMode == 'float' ? parseFloat(target) : parseInt(target);
}
