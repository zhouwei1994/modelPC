import { setStorage, removeStorage } from '@/plugins/utils';
export const state = {
  //用户数据
  userInfo: {},
};
export const mutations = {
  //储存用户信息
  setUserInfo(state, data) {
    if (data) {
      state.userInfo = Object.assign({}, state.userInfo, data);
      setStorage("userInfo", state.userInfo);
    }
  },
  // 退出APP
  emptyUserInfo(state) {
    state.userInfo = {};
    removeStorage("userInfo");
  },
};
export const actions = {};
