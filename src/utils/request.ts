import { getToken, removeToken } from './auth'

export const BASE_URI = import.meta.env.VITE_APP_BASE_API

interface IOption {
  path: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data?: any
}

export default async (options: IOption) => {

  return new Promise((resolve, reject) => {
    const token = getToken()
    uni.request({
      url: `${BASE_URI}${options.path}`,
      method: options.method,
      data: {
        _t: Date.now(),
        ...options.data
      },
      header: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      success(res: any) {
        // 未设置状态码则默认成功状态
        const code = res.data['code'] || 200
        // 获取错误信息
        let msg = res.data['msg'] || ''
        if (code === 200) {
          resolve(res.data.data);
        } else if (code == 11001 || code == 11002) {
          //其他异常
          removeToken()
          uni.showToast({
            title: '当前登入状态异常，请重新登入。',
            icon: 'none'
          })
          reject(msg);
        } else {
          uni.showToast({
            title: msg,
            icon: 'none'
          })
          reject(msg);
        }
      },
      fail(err) {
        uni.hideLoading()
        //请求失败
        uni.showToast({
          title: '请求服务器失败',
          icon: 'none'
        })
        reject(err)
      }
    })
  })
}