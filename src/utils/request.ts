import Taro from '@tarojs/taro'
import { getToken, removeToken } from './auth'

export const BASE_URI: string = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://api.lol-tool.com'

interface IOption {
  path: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data?: any
}

export default async (options: IOption) => {
  const token = getToken()
  return Taro.request({
    url: `${BASE_URI}${options.path}`,
    method: options.method,
    data: {
      data: { _t: Date.now(), ...options.data },
    },
    header: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
  }).then(res => {
    // 未设置状态码则默认成功状态
    const code = res.data['code'] || 200
    // 获取错误信息
    let msg = res.data['msg'] || ''
    if (code === 200) {
      return res.data.data;
    } else {
      Taro.showToast({
        title: msg,
        duration: 1500,
        icon: 'none',
        mask: false,
      });
      if (code == 11001 || code == 11002) {
        Taro.showToast({
          title: `当前登入状态异常，请重新登入。`,
          duration: 1500,
          icon: 'none',
          mask: false,
        });
        removeToken()
      } else {
        Taro.showToast({
          title: `code ${code} 请求失败，请重新尝试`,
          duration: 1500,
          icon: 'none',
          mask: false,
        });
      }
    }
  }).catch(err => {
    let { message } = err
    if (message == 'Network Error') {
      message = '后端接口连接异常'
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时'
    } else if (message.includes('Request failed with status code')) {
      message = '系统接口' + message.substr(message.length - 3) + '异常'
    }
    Taro.showToast({
      title: message,
      duration: 1500,
      icon: 'none',
      mask: false,
    });
    return err
  })
}