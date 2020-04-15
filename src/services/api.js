// import request from '@/utils/request';

export function getTableList(body) {
  return {
    url: '/api/query',
    method: 'POST',
    data: body,
  };
}

export function insertData(body) {
  return {
    url: '/api/insert',
    method: 'POST',
    data: body,
  };
}

export function updateData(body) {
  return {
    url: '/api/update',
    method: 'POST',
    data: body,
  };
}

export function deleteItem(id) {
  return {
    url: '/api/delete',
    method: 'DELETE',
    data: { id },
  };
}
