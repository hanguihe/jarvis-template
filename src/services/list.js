import request from '@/util/request';

export async function getTableList() {
  return request('/list');
}

export async function getListDetail(id) {
  return request(`/list/detail?id=${id}`);
}
