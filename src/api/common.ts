import request from "../utils/request";

export const getCaptcha = (data?: object | any) => {
  return request({
    path: '/common/captcha',
    method: 'GET',
    data
  })
}

export const getRankData = (data?: object | any) => {
  return request({
    path: '/common/getRankData',
    method: 'GET',
    data
  })
}

export const getCarryChamp = (data?: object | any) => {
  return request({
    path: '/common/getCarryChamp',
    method: 'GET',
    data
  })
}