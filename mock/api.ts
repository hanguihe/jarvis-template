// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';
import data from './data.json';

export default {
  'POST /api/query': (req: Request, res: Response) => {
    setTimeout(() => {
      res.send({
        code: 0,
        msg: 'ok',
        data,
      });
    }, 1500);
  },
  'DELETE /api/delete': (req: Request, res: Response) => {
    setTimeout(() => {
      res.send({
        code: 0,
        msg: 'ok',
      });
    }, 1500);
  },
};
