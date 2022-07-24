import request from "../utils/request";

export const  getCaptcha = async data =>{
  return await request({
    path:'/common/captcha',
    method: 'GET',
    data
  })
}