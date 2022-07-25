import request from "../utils/request";

export const login = async data => {
  return await request({
    path: '/user/login',
    method: 'POST',
    data
  })
}

export const getMyInfo = async data => {
  return await request({
    path: '/user/getMyInfo',
    method: 'POST',
    data
  })
}
