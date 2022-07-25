import request from "../utils/request"

export const getAllBlacklist = async data => {
  return await request({
    path: '/blacklist/getAllBlacklist',
    method: 'GET',
    data
  })
}
