function restFul(code, msg, data) {
  return { code, msg, data };
}

export default {
  'GET /api/list': restFul(0, null, [
    {
      id: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      id: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ]),
  'GET /api/list/detail': restFul(0, null, {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  }),
};
