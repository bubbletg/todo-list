import axios, { AxiosRequestConfig } from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL
})

request.interceptors.request.use(function (config) {
  return config
}, function (err) {
  return Promise.reject(err)
})

request.interceptors.response.use(function (response) {
  return response
}, function (err) {
  return Promise.reject(err)
})

export default <T=any>(config:AxiosRequestConfig) => {
  return request(config).then(res => {
    return res.data.data as T
  })
}
