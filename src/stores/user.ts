import { login, getMyInfo, bindWxOpenid } from './../api/user';
import { defineStore } from "pinia";
import defaultAvatar from '/src/assets/logo.png'
import { setToken } from '../utils/auth';

export interface IUser {
  username: string
  nickName: string
  avatarUrl: string
  wxOpenId: string
  isLogin: boolean
}

export interface LoginDto {
  username: string;
  password: string;
  mac: string;
  captchaId: string;
  clientVersion: string;
  verifyCode: string;
}

export interface GetInfoDto {
  mac: string;
  clientVersion: string;
}

export const useUserStore = defineStore('user', {
  state: (): IUser => ({
    username: '登入之后体验全部功能',
    nickName: '点击此处进入登入页',
    avatarUrl: defaultAvatar,
    wxOpenId: '',
    isLogin: false
  }),
  getters: {},
  actions: {
    async handleLogin(dto: LoginDto) {
      const res: any = await login(dto)
      const { token, userinfo } = res;
      this.username = userinfo.username
      this.nickName = userinfo.nickName
      this.avatarUrl = userinfo.avatarUrl
      this.wxOpenId = userinfo.wxOpenId
      uni.showToast({
        title: '登入成功',
        icon: 'none'
      })
      setToken(token)
      this.isLogin = true
    },
    async resetUser() {
      this.username = '登入之后体验全部功能'
      this.nickName = '点击此处进入登入页'
      this.avatarUrl = defaultAvatar
      this.wxOpenId = ''
      this.isLogin = false
    },
    async getInfo(dto: GetInfoDto) {
      const res: any = await getMyInfo(dto)
      this.username = res.username
      this.nickName = res.nickName
      this.avatarUrl = res.avatarUrl
      this.wxOpenId = res.wxOpenId
      uni.showToast({
        title: '欢迎回来',
        icon: 'none'
      })
      this.isLogin = true
    },
    async bindWeApp() {
      try {
        const r: any = await uni.login({})

        await bindWxOpenid({ code: r.code })
        uni.showToast({
          title: '绑定成功',
          icon: 'none'
        })
        uni.reLaunch({ url: '/pages/index/index' })
      } catch (err) {
        uni.showToast({
          title: `${err}`,
          icon: 'error'
        })
      }
    }
  }
})