import { getStorage } from '@/plugins/utils';
export const state = {
  loading: false,
};
//缓存浏览器的数据名称
const cacheNameList = ["userInfo"];
let clearTime;
export const mutations = {
  //取出缓存数据（打开APP就取出）
  setCacheData(state) {
    for (let name of cacheNameList) {
      let data = getStorage(name);
      if (data) {
        state[name] = data;
      }
    }
  },
  //加载时动画
  setLoading(state, data) {
    if (state.loading) {
      clearTime && clearTimeout(clearTime);
      clearTime = setTimeout(function () {
        state.loading = data;
      }, 300);
    } else {
      state.loading = data;
    }
  },
};
export const actions = {};
