import { notification } from 'antd';

/**
 * @description 获取数据失败统一处理方法
 * @param {string} msg
 * @param fn
 */
export function getRequestError(msg, fn) {
  notification.error({
    message: '获取数据失败',
    description: msg,
  });
  if (fn && typeof fn === 'function') {
    fn();
  }
}
