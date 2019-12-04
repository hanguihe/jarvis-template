import axios from 'axios';
import { notification } from 'antd';

// 默认后端域名配置
axios.defaults.baseURL = 'https://www.xxx.com';

// 默认超时时间
axios.defaults.timeout = 5000;

axios.interceptors.request.use(
  config => {
    // 携带token访问
    const token = localStorage.getItem('token');
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.common.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    notification.error({
      message: '网络请求失败',
      description: '请检查您的网络配置',
    });
    throw new Error('client request fail:', error);
  },
);

// 响应结果，包含response header等字段，若无影响可直接返回res.data
axios.interceptors.response.use(
  res => res.data,
  error => {
    let message = '未知错误';
    let description = error.toString();

    if (description.match('timeout')) {
      message = '连接超时';
      description = '请检查网络情况！';
    } else if (description.match('Network Error')) {
      message = '远程服务器错误';
      description = '请联系网站管理员或过一段时间再试';
    }

    notification.error({ message, description });

    // 响应错误处理
    throw new Error('server response error: ', error);
  },
);
