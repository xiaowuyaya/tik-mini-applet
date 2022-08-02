import request from "../utils/request";

export const login = (data?: object | any) => {
  return request({
    path: '/user/wxLogin',
    method: 'POST',
    data
  })
}

export const getMyInfo = (data?: object | any) => {
  return request({
    path: '/user/getMyInfo',
    method: 'POST',
    data
  })
}

export const bindWxOpenid = (data?: object | any) => {
  return request({
    path: '/user/bindWxOpenid',
    method: 'GET',
    data
  })
}

export const getAllBlacklist = (data?: object | any) => {
  return request({
    path: '/blacklist/getAllBlacklist',
    method: 'GET',
    data
  })
}