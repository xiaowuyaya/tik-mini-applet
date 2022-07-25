import request from "../utils/request"

export const getCaptcha = async data => {
  return await request({
    path: '/common/captcha',
    method: 'GET',
    data
  })
}

export const getRankData = async data => {
  return await request({
    path: '/common/getRankData',
    method: 'GET',
    data
  })
}

export const getCarryChamp = async data => {
  return await request({
    path: '/common/getCarryChamp',
    method: 'GET',
    data
  })
}