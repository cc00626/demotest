import axios from "axios";
//基础配置
const service = axios.create({
  // baseURL: "/api",
  // timeout: 5000,
});

service.interceptors.request.use((config) => {
  // 在请求发送之前做一些处理
  return config;
});

service.interceptors.response.use(
  (response) => {
    // 请求响应成功
    return response.data;
  },
  (error) => {
    // 请求响应失败
    return Promise.reject(error);
  }
);
export default service;
