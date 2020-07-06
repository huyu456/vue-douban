import axios from 'axios'
import vueCookie from 'vue-cookie'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log(config)
  const token = vueCookie.get('token')
  // 当含有apikey时不拦截
  if (token && !(config.url.includes('/j/') || config.url.includes('/v2/'))) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (response.status) {
    return Promise.resolve(response)
  }
}, function (error) {
  // 对响应错误做点什么
  if (error.response) {
    switch (error.response.status) {
      case 401:
        console.log('401错误')
        break
      case 403:
        console.log('无权限访问')
        break
      case 500:
        console.log('服务器错误')
        break
    }
  }
  return Promise.reject(error)
})
