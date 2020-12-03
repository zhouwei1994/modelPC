import {
  prompt,
  $alert,
  clickDateDiff,
  formatTime
} from '@/plugins/utils';
import Vue from 'vue'
/**
 * 时间戳转换为想要的时间格式
 */
Vue.filter("format", function (value, format) {
  return formatTime(value, format);
});
/**
 * 时间转换为XX前
 */
Vue.filter("getDateDiff", function (value) {
  return clickDateDiff(value);
});
/**
 * 金额保留两位
 */
Vue.filter("decimal", function (value) {
  return parseFloat(value).toFixed(2);
});
/**
 * 消息提示
 */
Vue.prototype.prompt = prompt;
/**
 * 确认框 type = 1
 * 提示框 type = 2
 * 输入框 type = 3
 * 用法：
 * this.$alert("您还未登录，请登录", {}, res => {
 *    console.log(res); 
 *    //res.confirm 是否点击确认
 * });
 */
Vue.prototype.$alert = $alert;
