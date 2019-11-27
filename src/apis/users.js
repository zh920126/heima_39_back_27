// 引入axios
import axios from '@/utils/myaxios.js'

// 创建用户登录的api
// 注意！！ params是一个对象，不管发生什么事，promise的参数params始终都是一个对象
export const Login = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}
