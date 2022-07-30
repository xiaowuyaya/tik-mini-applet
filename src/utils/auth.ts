export const TOKEN_KEY = 'TOKEN'

export function getToken(): string | null {
  return uni.getStorageSync(TOKEN_KEY) || null
}

export function setToken(token: string): void {
  uni.setStorageSync(TOKEN_KEY, token)
}

export function removeToken(): void {
  uni.removeStorageSync(TOKEN_KEY)
}