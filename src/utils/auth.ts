import { setStorageSync, getStorageSync, removeStorageSync } from '@tarojs/taro';

export const TOKEN_KEY = 'TOKEN'

export function getToken(): string | null {
  return getStorageSync(TOKEN_KEY) || null
}

export function setToken(token: string): void {
  setStorageSync(TOKEN_KEY, token)
}

export function removeToken(): void {
  removeStorageSync(TOKEN_KEY)
}