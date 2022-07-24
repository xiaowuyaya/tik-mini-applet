import { defineStore } from 'pinia';

export interface IUser {
  username: string
  nickName: string
  avatar: string
  wxOpenId: string
}

export const useUserStore = defineStore('user', {
  state: ():IUser => ({
    username: '',
    nickName: '',
    avatar: '',
    wxOpenId: '',
  }),
  getters: {

  },
  actions: {

  }
});