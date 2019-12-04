const userInfo = {
  name: 'Mary',
};

const token = 'sarfqwperjkalksjdqoiwueo;qwejoq';

export async function mockUserInfo() {
  return { code: 0, data: { userInfo, token } };
}
