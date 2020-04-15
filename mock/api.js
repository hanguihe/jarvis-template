export default {
  'POST /api/query': (req, res) => {
    setTimeout(() => {
      res.send({
        code: 0,
        msg: 'ok',
        data: [
          {
            id: 1,
            name: '宇智波斑',
            gender: '男',
            age: 0,
            blood: 'O型',
            birthday: '12月24日',
            height: '179.0cm',
            weight: '71.3kg',
            character: '好战、野心家',
            attribute: '火、风、雷、土、水、阴、阳',
            skills: ['火遁·龙炎放歌之术🔥', '须佐能乎·完全体😈', '轮墓·边狱'],
          },
          {
            id: 2,
            name: '宇智波带土',
            gender: '男',
            age: 31,
            blood: 'O型',
            birthday: '2月10日',
            height: '182.0cm',
            weight: '70.3kg',
            character: '善良、热情、开朗',
            attribute: '火、风、雷、土、水、阴',
            skills: ['神威'],
          },
          {
            id: 3,
            name: '宇智波鼬',
            gender: '男',
            age: 21,
            blood: 'AB型',
            birthday: '6月9日',
            height: '178cm',
            weight: '58kg',
            character: '温柔智慧，为弟弟着想，自我牺牲',
            attribute: '火、风、水、阴、阳',
            skills: [
              '十拳剑',
              '八咫镜',
              '火遁·豪龙火之术',
              '天照',
              '月读',
              '须佐能乎·完全体',
              '伊邪那美',
            ],
          },
        ],
      });
    }, 1500);
  },
  'DELETE /api/delete': (req, res) => {
    setTimeout(() => {
      res.send({
        code: 0,
        msg: 'ok',
        data: null,
      });
    }, 1500);
  },
  'POST /api/insert': (req, res) => {
    setTimeout(() => {
      res.send({
        code: 0,
        msg: 'ok',
        data: null,
      });
    }, 1500);
  },
  'POST /api/update': (req, res) => {
    setTimeout(() => {
      res.send({
        code: 0,
        msg: 'ok',
        data: null,
      });
    }, 1500);
  },
};
