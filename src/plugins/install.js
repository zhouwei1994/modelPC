import {
  prompt,
  $alert
} from '@/plugins/utils';
import base from '@/config/baseUrl';
import request from '@/config/requestConfig';
import store from '@/store';
import router from '@/router';
export default {
  install: (app) => {
    /**
     * 配置的全局
     */
    app.prototype.$base = base;
    /**
     * 全局请求配置
     */
    app.prototype.$http = request;

    /**
     * 消息提示
     */
    app.prototype.$prompt = prompt;
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
    app.prototype.$alert = $alert;


    app.prototype.judgeLogin = function (callback) {
      let userInfo = store.state.userInfo;
      if (userInfo.token) {
        callback && callback();
      } else {
        router.push('/login');
      }
    }


    /**
     * 时间戳转换为想要的时间格式
     */
    // app.filter("format", function (value, format) {
    //   return formatTime(value, format);
    // });
    /**
     * 时间转换为XX前
     */
    // app.filter("getDateDiff", function (value) {
    //   return clickDateDiff(value);
    // });
    /**
     * 金额保留两位
     */
    // app.filter("decimal", function (value) {
    //   return parseFloat(value).toFixed(2);
    // });
  }
}


