import axios from 'axios'

const request=axios.create({
  baseURL:'http://localhost:5000/xc-blog/admin',
  timeout:30000,
})
//请求拦截器
request.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.token = sessionStorage.getItem('token') || ''
  } 
  return config
},(error) => {
  return Promise.reject(error)
})
//响应拦截器
request.interceptors.response.use( (response) =>{
  return response.data
},(error) => {
  return Promise.reject(error)
})
export default request