// import request from '@/utils/request';

export function getTableList(body: { [key: string]: any }) {
  return {
    url: '/api/query',
    method: 'POST',
    data: body,
  };
}

export function insertData(body: { [key: string]: any }) {
  return {
    url: '/api/insert',
    method: 'POST',
    data: body,
  };
}

export function updateData(body: { [key: string]: any }) {
  return {
    url: '/api/update',
    method: 'POST',
    data: body,
  };
}

export function deleteItem(id: number) {
  return {
    url: '/api/delete',
    method: 'DELETE',
    data: { id },
  };
}
