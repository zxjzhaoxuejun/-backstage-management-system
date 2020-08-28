import request from '@/utils/request'
import qs from 'qs'
// 获取商家信息
export function getInfo(params) {
  return request({
    url: `http://api.xyy51.cn/index/app/newdetail`,
    method: 'get',
    params: params
  })
}

export function getList(data) {
  return request({
    url: `http://api.xyy51.cn/index/app/newlist`,
    method: 'post',
    data: qs.stringify(data)
  })
}
