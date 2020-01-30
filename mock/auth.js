function restFul(code, msg, data) {
  return { code, msg, data };
}

export default {
  'GET /api/auth/info': restFul(0, null, {
    id: 1,
    name: '钢铁侠',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    email: 'xxxx@xx.com',
  }),
  'POST /api/auth/login': (req, res) => {
    return res.send(
      restFul(0, null, {
        id: 1,
        name: '钢铁侠',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        email: 'xxxx@xx.com',
      }),
    );
  },
};
