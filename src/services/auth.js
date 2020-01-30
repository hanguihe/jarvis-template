import request from '@/util/request';

export async function getUserInfo() {
  return request('/auth/info');
}

export async function authLogin(account, password) {
  return request('/auth/login', { method: 'POST', data: { account, password } });
}
