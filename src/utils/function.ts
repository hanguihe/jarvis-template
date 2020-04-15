import { notification } from 'antd';

/**
 * 获取数据失败统一处理方法
 * @param {string} msg
 * @param {string|Error} desc
 * @param {function?} fn
 */
export function getRequestError(
  msg: string,
  desc: string | Error,
  fn?: () => void,
) {
  let description = desc;

  // 判断是否是Error类型
  if (desc instanceof Error) {
    description = desc.message;
  }

  notification.error({ message: msg, description });

  if (fn && typeof fn === 'function') {
    fn();
  }
}

/**
 * 用于antd的Select组件过滤
 * @param input
 * @param option
 * @return {boolean}
 */
export function selectFilter(input: string, option: any) {
  if (typeof option.children === 'string') {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  }
  return false;
}
