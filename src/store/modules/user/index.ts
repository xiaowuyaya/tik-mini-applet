import { defineStore } from 'pinia';
import Taro from '@tarojs/taro'
import defaultAvatar from '../../../assets/logo.png'
import { getMyInfo, login } from '../../../api/user';
import { wxLogin } from '../../../api/common';
import { setToken } from '../../../utils/auth';
import { BASE_URI } from '../../../utils/request';

export interface LoginClientUserDto {
  username: string;
  password: string;
  mac: string;
  captchaId: string;
  clientVersion: string;
  verifyCode: string;
}

export interface IUser {
  username: string
  nickName: string
  avatarUrl: string
  wxOpenId: string
  isLogin: boolean
}

export interface MyInfoDto {
  mac: string;
  clientVersion: string;
}

export const useUserStore = defineStore('user', {
  state: (): IUser => ({
    username: '登入之后体验全部功能',
    nickName: '点击此处进入登入页',
    avatarUrl: defaultAvatar,
    wxOpenId: '',
    isLogin: false,
  }),
  getters: {

  },
  actions: {
    async doLogin(loginForm: LoginClientUserDto) {
      const res = await login(loginForm)

      const { token, userinfo } = res;

      this.username = userinfo.username
      this.nickName = userinfo.nickName
      this.avatarUrl = `${BASE_URI}${userinfo.avatarUrl}`
      this.wxOpenId = userinfo.wxOpenId
      Taro.showToast({
        title: '登入成功',
        duration: 1500,
        icon: 'none',
        mask: false,
      });
      setToken(token)
      this.isLogin = true
    },

    async myInfo(data: MyInfoDto) {
      const res = await getMyInfo(data);
      this.username = res.username
      this.nickName = res.nickName
      this.avatarUrl = `${BASE_URI}${res.avatarUrl}`
      this.wxOpenId = res.wxOpenId
      Taro.showToast({
        title: `欢迎回来：${this.nickName}`,
        duration: 1500,
        icon: 'none',
        mask: false,
      });
      this.isLogin = true

    },

    async wxLogin() {
      try {
        const r = await Taro.login()
        await wxLogin({code: r.code})
        Taro.showToast({
          title: '订阅成功',
          duration: 1500,
          icon: 'none',
          mask: false,
        });
        Taro.reLaunch({ url: '/pages/index/index' })
      } catch (err) {
        console.log(err);
      }
    }
  }
});