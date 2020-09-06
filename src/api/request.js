import axios from "axios";

/**
 * 设置默认地址
 * 设置超时时间
 * 设置请求头 Content-Type
 * 设置跨域是否允许带凭证
 */
const service = axios.create({
  baseURL: `${process.env.VUE_APP_BASE_API}`,
  timeout: 60000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  withCredentials: true
});

/**
 * 设置请求拦截器
 * Token校验
 */
service.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    token && (config.headers.Authorization = token);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

/**
 * 设置响应拦截器
 */
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code !== 200) {
      return Promise.reject(new Error(res.msg));
    } else {
      return res;
    }
  },
  error => {
    return Promise.reject(error);
  }
);

export default service;
